import crypto from "crypto";

import db from "@/index.js";
import { eq, and } from "drizzle-orm";
import { userTable } from "@/db/user.schema.js";
import { AppError } from "@/utils/error.util.js";
import { publish } from "@/rabbitmq/event.pubSub.js";
import { verifyOtp, deleteOtp } from "../redis/otp.redis.js";

export interface VerifyOtpData {
  publicId: string | undefined;
  email: string | undefined;
  otp: string;
}

export interface VerifyOtpResponse {
  isVerified: boolean;
}

const verifyOtpService = async (
  data: VerifyOtpData,
): Promise<VerifyOtpResponse> => {
  const eventId = crypto.randomUUID();

  try {
    await publish("user.email.otp.verification.init", {
      eventId,
      eventName: "EmailOtpVerificationInit",
      serviceName: "User_Service",
      timestamp: new Date(),
      payload: {
        userId: data.publicId ?? null,
        email: data.email,
      },
    });

    const isValidOtp = await verifyOtp(String(data.email), String(data.otp));

    if (!isValidOtp) {
      throw new AppError("Invalid or expired OTP.", 400);
    }

    const [user] = await db
      .update(userTable)
      .set({
        isVerified: true,
        emailVerifiedAt: new Date(),
      })
      .where(
        and(
          eq(userTable.publicId, String(data.publicId)),
          eq(userTable.email, String(data.email)),
          eq(userTable.isVerified, false),
        ),
      )
      .returning({
        publicId: userTable.publicId,
      });

    if (!user) {
      throw new AppError("User not found or already verified.", 404);
    }

    await deleteOtp(String(data.email));

    await publish("user.email.otp.verification.success", {
      eventId,
      eventName: "EmailOtpVerificationSuccess",
      serviceName: "User_Service",
      timestamp: new Date(),
      payload: {
        userId: user.publicId,
        email: data.email,
      },
    });

    return {
      isVerified: true,
    };
  } catch (error) {
    // Business failures.
    if (error instanceof AppError) {
      await publish("user.email.otp.verification.failed", {
        eventId,
        eventName: "EmailOtpVerificationFailed",
        serviceName: "User_Service",
        timestamp: new Date(),
        payload: {
          userId: data.publicId ?? null,
          email: data.email,
          reason: error.message,
        },
      });

      throw error;
    }

    // Unexpected system failures.
    await publish("user.email.otp.verification.error", {
      eventId,
      eventName: "EmailOtpVerificationError",
      serviceName: "User_Service",
      timestamp: new Date(),
      payload: {
        userId: data.publicId ?? null,
        email: data.email,
        reason: error instanceof Error ? error.message : "UNKNOWN_ERROR",
      },
    });

    throw error;
  }
};

export default verifyOtpService;

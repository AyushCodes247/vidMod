import db from "@/index.js";
import { eq } from "drizzle-orm";
import { userTable } from "@/db/user.schema.js";
import { AppError } from "@/utils/error.util.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
} from "@/utils/auth.util.js";
import { storeSession } from "../redis/session.redis.js";
import type { GlobalReturnDataType } from "./register.service.js";
import { publish } from "@/rabbitmq/event.pubSub.js";
import crypto from "crypto";

export interface LoginData {
  email: string;
  password: string;
}

const loginService = async (data: LoginData): Promise<GlobalReturnDataType> => {
  const eventId = crypto.randomUUID();

  try {
    // Login request received.
    await publish("user.login.init", {
      eventId,
      eventName: "UserLoginInit",
      serviceName: "User_Service",
      timestamp: new Date(),
      payload: {
        userId: null,
        email: data.email,
      },
    });

    // Check if user exists.
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.email, data.email),
    });

    if (!user) {
      await publish("user.login.failed", {
        eventId,
        eventName: "UserLoginFailed",
        serviceName: "User_Service",
        timestamp: new Date(),
        payload: {
          userId: null,
          email: data.email,
          reason: "INVALID_CREDENTIALS",
        },
      });

      throw new AppError("Invalid email or password.", 401);
    }

    // Verify password.
    const isValidPassword = await verifyPassword(user.password, data.password);

    if (!isValidPassword) {
      await publish("user.login.failed", {
        eventId,
        eventName: "UserLoginFailed",
        serviceName: "User_Service",
        timestamp: new Date(),
        payload: {
          userId: user.publicId,
          email: data.email,
          reason: "INVALID_CREDENTIALS",
        },
      });

      throw new AppError("Invalid email or password.", 401);
    }

    // Update last login timestamp.
    await db
      .update(userTable)
      .set({
        lastLoginAt: new Date(),
      })
      .where(eq(userTable.id, user.id));

    // Generate tokens.
    const payload = {
      publicId: user.publicId,
      name: user.name,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Store refresh token in Redis.
    await storeSession(user.publicId, refreshToken);

    // Login successful.
    await publish("user.login.success", {
      eventId,
      eventName: "UserLoginSuccess",
      serviceName: "User_Service",
      timestamp: new Date(),
      payload: {
        userId: user.publicId,
        email: user.email,
      },
    });

    return {
      user: {
        publicId: user.publicId,
        name: user.name,
        email: user.email,
        gender: user.gender,
        isVerified: user.isVerified,
      },
      accessToken,
      refreshToken,
    };
  } catch (error) {
    // Unexpected system errors.
    if (!(error instanceof AppError)) {
      await publish("user.login.error", {
        eventId,
        eventName: "UserLoginError",
        serviceName: "User_Service",
        timestamp: new Date(),
        payload: {
          userId: null,
          email: data.email,
          reason: error instanceof Error ? error.message : "UNKNOWN_ERROR",
        },
      });
    }

    throw error;
  }
};

export default loginService;

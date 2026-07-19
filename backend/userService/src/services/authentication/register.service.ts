import db from "@/index.js";
import { eq } from "drizzle-orm";
import { userTable } from "@/db/user.schema.js";
import { AppError } from "@/utils/error.util.js";
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "@/utils/auth.util.js";
import { storeSession } from "../redis/session.redis.js";
import { publish } from "@/rabbitmq/event.pubSub.js";
import crypto from "crypto";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  gender: "male" | "female" | "others" | "prefer_not_to_say";
}

export interface GlobalReturnDataType {
  user: {
    publicId: string;
    name: string;
    email: string;
    gender: string;
    isVerified: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

const registerService = async (
  data: RegisterData,
): Promise<GlobalReturnDataType> => {
  const eventId = crypto.randomUUID();

  try {
    // Registration request received.
    await publish("user.register.init", {
      eventId,
      eventName: "UserRegisterInit",
      serviceName: "User_Service",
      timestamp: new Date(),
      payload: {
        userId: null,
        email: data.email,
      },
    });

    // Check if user already exists.
    const existingUser = await db.query.userTable.findFirst({
      where: eq(userTable.email, data.email),
    });

    if (existingUser) {
      await publish("user.register.failed", {
        eventId,
        eventName: "UserRegisterFailed",
        serviceName: "User_Service",
        timestamp: new Date(),
        payload: {
          userId: null,
          email: data.email,
          reason: "USER_ALREADY_EXISTS",
        },
      });

      throw new AppError("User already exists.", 409);
    }

    // Hash password.
    const hashedPassword = await hashPassword(data.password);

    // Insert user.
    const [user] = await db
      .insert(userTable)
      .values({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        gender: data.gender,
      })
      .returning({
        publicId: userTable.publicId,
        name: userTable.name,
        email: userTable.email,
        gender: userTable.gender,
        isVerified: userTable.isVerified,
      });

    if (!user) {
      await publish("user.register.failed", {
        eventId,
        eventName: "UserRegisterFailed",
        serviceName: "User_Service",
        timestamp: new Date(),
        payload: {
          userId: null,
          email: data.email,
          reason: "USER_INSERTION_FAILED",
        },
      });

      throw new AppError("Failed to register user.", 500);
    }

    // Generate tokens.
    const payload = {
      publicId: user.publicId,
      name: user.name,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Store refresh token in Redis.
    await storeSession(user.publicId, refreshToken);

    // Registration completed successfully.
    await publish("user.register.success", {
      eventId,
      eventName: "UserRegisterSuccess",
      serviceName: "User_Service",
      timestamp: new Date(),
      payload: {
        userId: user.publicId,
        email: user.email,
      },
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    // Publish only unexpected system errors.
    if (!(error instanceof AppError)) {
      await publish("user.register.error", {
        eventId,
        eventName: "UserRegisterError",
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

export default registerService;

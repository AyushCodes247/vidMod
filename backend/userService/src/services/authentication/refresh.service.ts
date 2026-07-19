import crypto from "crypto";

import {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/auth.util.js";
import { AppError } from "@/utils/error.util.js";
import { verifySession, rotateSession } from "../redis/session.redis.js";
import { publish } from "@/rabbitmq/event.pubSub.js";

export interface RefreshResponse {
  accessToken: string;
  newRefreshToken: string;
}

const refreshService = async (
  refreshToken: string,
): Promise<RefreshResponse> => {
  const eventId = crypto.randomUUID();

  try {
    // Refresh request received.
    await publish("user.refresh.init", {
      eventId,
      eventName: "RefreshInit",
      serviceName: "User_Service",
      timestamp: new Date(),
      payload: {
        userId: null,
      },
    });

    // Verify refresh token.
    const payload = verifyRefreshToken(refreshToken);

    // Verify Redis session.
    const validSession = await verifySession(payload.publicId, refreshToken);

    if (!validSession) {
      throw new AppError("Session expired.", 401);
    }

    // Generate new tokens.
    const jwtPayload = {
      publicId: payload.publicId,
      name: payload.name,
    };

    const newAccessToken = generateAccessToken(jwtPayload);

    const newRefreshToken = generateRefreshToken(jwtPayload);

    // Rotate Redis session.
    await rotateSession(payload.publicId, newRefreshToken);

    // Refresh successful.
    await publish("user.refresh.success", {
      eventId,
      eventName: "RefreshSuccess",
      serviceName: "User_Service",
      timestamp: new Date(),
      payload: {
        userId: payload.publicId,
      },
    });

    return {
      accessToken: newAccessToken,
      newRefreshToken,
    };
  } catch (error) {
    // Business failures.
    if (error instanceof AppError) {
      await publish("user.refresh.failed", {
        eventId,
        eventName: "RefreshFailed",
        serviceName: "User_Service",
        timestamp: new Date(),
        payload: {
          userId: null,
          reason: error.message,
        },
      });

      throw error;
    }

    // Unexpected system failures.
    await publish("user.refresh.error", {
      eventId,
      eventName: "RefreshError",
      serviceName: "User_Service",
      timestamp: new Date(),
      payload: {
        userId: null,
        reason: error instanceof Error ? error.message : "UNKNOWN_ERROR",
      },
    });

    throw error;
  }
};

export default refreshService;

import crypto from "crypto";

import { AppError } from "@/utils/error.util.js";
import { verifyRefreshToken } from "@/utils/auth.util.js";
import { deleteSession } from "../redis/session.redis.js";
import { publish } from "@/rabbitmq/event.pubSub.js";

const logoutService = async (refreshToken: string): Promise<void> => {
  const eventId = crypto.randomUUID();

  try {
    // Logout request received.
    await publish("user.logout.init", {
      eventId,
      eventName: "UserLogoutInit",
      serviceName: "User_Service",
      timestamp: new Date(),
      payload: {
        userId: null,
      },
    });

    // Verify refresh token.
    const payload = verifyRefreshToken(refreshToken);

    // Delete user's refresh token session from Redis.
    await deleteSession(payload.publicId);

    // Logout successful.
    await publish("user.logout.success", {
      eventId,
      eventName: "UserLogoutSuccess",
      serviceName: "User_Service",
      timestamp: new Date(),
      payload: {
        userId: payload.publicId,
      },
    });
  } catch (error) {
    // Expected / Business failures.
    if (error instanceof AppError) {
      await publish("user.logout.failed", {
        eventId,
        eventName: "UserLogoutFailed",
        serviceName: "User_Service",
        timestamp: new Date(),
        payload: {
          userId: null,
          reason: error.message,
        },
      });

      throw error;
    }

    // Unexpected / System failures.
    await publish("user.logout.error", {
      eventId,
      eventName: "UserLogoutError",
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

export default logoutService;

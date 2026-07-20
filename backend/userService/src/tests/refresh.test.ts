import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";

import refreshService from "@/services/authentication/refresh.service.js";

import {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/auth.util.js";

import {
  verifySession,
  rotateSession,
} from "@/services/redis/session.redis.js";

import { publish } from "@/rabbitmq/event.pubSub.js";
import { AppError } from "@/utils/error.util.js";

vi.mock("@/utils/auth.util");
vi.mock("@/services/redis/session.redis");
vi.mock("@/rabbitmq/event.pubSub");

describe("Refresh Service", () => {
  const mockPayload = {
    publicId: "user-public-id",
    name: "Ayush",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setupSuccessMocks = () => {
    (verifyRefreshToken as Mock).mockReturnValue(mockPayload);

    (verifySession as Mock).mockResolvedValue(true);

    (generateAccessToken as Mock).mockReturnValue("new-access-token");

    (generateRefreshToken as Mock).mockReturnValue("new-refresh-token");

    (rotateSession as Mock).mockResolvedValue(undefined);
  };

  it("should generate new access token", async () => {
    setupSuccessMocks();

    const result = await refreshService("valid-refresh-token");

    expect(result.accessToken).toBe("new-access-token");

    expect(generateAccessToken).toHaveBeenCalled();
  });

  it("should rotate refresh token", async () => {
    setupSuccessMocks();

    const result = await refreshService("valid-refresh-token");

    expect(result.newRefreshToken).toBe("new-refresh-token");

    expect(rotateSession).toHaveBeenCalledWith(
      mockPayload.publicId,
      "new-refresh-token",
    );
  });

  it("should reject expired token", async () => {
    (verifyRefreshToken as Mock).mockImplementation(() => {
      throw new AppError("Unauthorized", 401);
    });

    await expect(refreshService("expired-token")).rejects.toThrow(AppError);
  });

  it("should reject invalid session", async () => {
    (verifyRefreshToken as Mock).mockReturnValue(mockPayload);

    (verifySession as Mock).mockResolvedValue(false);

    await expect(refreshService("valid-refresh-token")).rejects.toThrow(
      AppError,
    );
  });

  it("should publish refresh init event", async () => {
    setupSuccessMocks();

    await refreshService("valid-refresh-token");

    expect(publish).toHaveBeenCalledWith(
      "user.refresh.init",
      expect.objectContaining({
        eventName: "RefreshInit",
      }),
    );
  });

  it("should publish refresh success event", async () => {
    setupSuccessMocks();

    await refreshService("valid-refresh-token");

    expect(publish).toHaveBeenCalledWith(
      "user.refresh.success",
      expect.objectContaining({
        eventName: "RefreshSuccess",
      }),
    );
  });
});

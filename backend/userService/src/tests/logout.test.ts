import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  type Mock,
} from "vitest";

import logoutService from "@/services/authentication/logout.service.js";

import { deleteSession } from "@/services/redis/session.redis.js";
import { publish } from "@/rabbitmq/event.pubSub.js";

import { verifyRefreshToken } from "@/utils/auth.util.js";
import { AppError } from "@/utils/error.util.js";

vi.mock("@/services/redis/session.redis");
vi.mock("@/rabbitmq/event.pubSub");
vi.mock("@/utils/auth.util");

describe("Logout Service", () => {
  const mockPayload = {
    publicId: "user-public-id",
    name: "Ayush",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setupSuccessMocks = () => {
    (verifyRefreshToken as Mock).mockReturnValue(
      mockPayload,
    );

    (deleteSession as Mock).mockResolvedValue(
      undefined,
    );
  };

  it("should logout successfully", async () => {
    setupSuccessMocks();

    await expect(
      logoutService("valid-refresh-token"),
    ).resolves.not.toThrow();
  });

  it("should delete redis session", async () => {
    setupSuccessMocks();

    await logoutService("valid-refresh-token");

    expect(deleteSession).toHaveBeenCalledWith(
      mockPayload.publicId,
    );
  });

  it("should reject invalid refresh token", async () => {
    (verifyRefreshToken as Mock).mockImplementation(() => {
      throw new AppError("Unauthorized", 401);
    });

    await expect(
      logoutService("invalid-refresh-token"),
    ).rejects.toThrow(AppError);
  });

  it("should publish logout init event", async () => {
    setupSuccessMocks();

    await logoutService("valid-refresh-token");

    expect(publish).toHaveBeenCalledWith(
      "user.logout.init",
      expect.objectContaining({
        eventName: "UserLogoutInit",
      }),
    );
  });

  it("should publish logout success event", async () => {
    setupSuccessMocks();

    await logoutService("valid-refresh-token");

    expect(publish).toHaveBeenCalledWith(
      "user.logout.success",
      expect.objectContaining({
        eventName: "UserLogoutSuccess",
      }),
    );
  });
});
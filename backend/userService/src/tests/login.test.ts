import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  type Mock,
} from "vitest";

import loginService from "@/services/authentication/login.service.js";

import db from "@/index.js";
import { publish } from "@/rabbitmq/event.pubSub.js";
import { storeSession } from "@/services/redis/session.redis.js";

import {
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/auth.util.js";

import { AppError } from "@/utils/error.util.js";

vi.mock("@/index");
vi.mock("@/rabbitmq/event.pubSub");
vi.mock("@/services/redis/session.redis");
vi.mock("@/utils/auth.util");

describe("Login Service", () => {
  const mockUser = {
    id: 1,
    publicId: "user-public-id",
    name: "Ayush",
    email: "ayush@gmail.com",
    password: "hashed-password",
    gender: "male",
    isVerified: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setupSuccessMocks = () => {
    (db.query.userTable.findFirst as Mock).mockResolvedValue(
      mockUser,
    );

    (verifyPassword as Mock).mockResolvedValue(true);

    (db.update as Mock).mockReturnValue({
      set: () => ({
        where: vi.fn(),
      }),
    });

    (generateAccessToken as Mock).mockReturnValue(
      "access-token",
    );

    (generateRefreshToken as Mock).mockReturnValue(
      "refresh-token",
    );
  };

  it("should login successfully", async () => {
    setupSuccessMocks();

    const result = await loginService({
      email: "ayush@gmail.com",
      password: "Password@123",
    });

    expect(result.user.publicId).toBe(
      mockUser.publicId,
    );

    expect(result.accessToken).toBe(
      "access-token",
    );

    expect(result.refreshToken).toBe(
      "refresh-token",
    );
  });

  it("should reject invalid email", async () => {
    (db.query.userTable.findFirst as Mock).mockResolvedValue(
      null,
    );

    await expect(
      loginService({
        email: "ayush@gmail.com",
        password: "Password@123",
      }),
    ).rejects.toThrow(AppError);
  });

  it("should reject invalid password", async () => {
    (db.query.userTable.findFirst as Mock).mockResolvedValue(
      mockUser,
    );

    (verifyPassword as Mock).mockResolvedValue(
      false,
    );

    await expect(
      loginService({
        email: "ayush@gmail.com",
        password: "Password@123",
      }),
    ).rejects.toThrow(AppError);
  });

  it("should update last login", async () => {
    setupSuccessMocks();

    await loginService({
      email: "ayush@gmail.com",
      password: "Password@123",
    });

    expect(db.update).toHaveBeenCalled();
  });

  it("should generate access token", async () => {
    setupSuccessMocks();

    await loginService({
      email: "ayush@gmail.com",
      password: "Password@123",
    });

    expect(generateAccessToken).toHaveBeenCalled();
  });

  it("should generate refresh token", async () => {
    setupSuccessMocks();

    await loginService({
      email: "ayush@gmail.com",
      password: "Password@123",
    });

    expect(generateRefreshToken).toHaveBeenCalled();
  });

  it("should store session in redis", async () => {
    setupSuccessMocks();

    await loginService({
      email: "ayush@gmail.com",
      password: "Password@123",
    });

    expect(storeSession).toHaveBeenCalledWith(
      mockUser.publicId,
      "refresh-token",
    );
  });

  it("should publish login init event", async () => {
    setupSuccessMocks();

    await loginService({
      email: "ayush@gmail.com",
      password: "Password@123",
    });

    expect(publish).toHaveBeenCalledWith(
      "user.login.init",
      expect.objectContaining({
        eventName: "UserLoginInit",
      }),
    );
  });

  it("should publish login success event", async () => {
    setupSuccessMocks();

    await loginService({
      email: "ayush@gmail.com",
      password: "Password@123",
    });

    expect(publish).toHaveBeenCalledWith(
      "user.login.success",
      expect.objectContaining({
        eventName: "UserLoginSuccess",
      }),
    );
  });
});
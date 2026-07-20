import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  type Mock,
} from "vitest";

import registerService from "@/services/authentication/register.service.js";

import db from "@/index.js";
import { publish } from "@/rabbitmq/event.pubSub.js";
import { storeSession } from "@/services/redis/session.redis.js";

import {
  hashPassword,
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/auth.util.js";

import { AppError } from "@/utils/error.util.js";

vi.mock("@/index");
vi.mock("@/rabbitmq/event.pubSub");
vi.mock("@/services/redis/session.redis");
vi.mock("@/utils/auth.util");

describe("Register Service", () => {
  const mockUser = {
    publicId: "user-public-id",
    name: "Ayush",
    email: "ayush@gmail.com",
    gender: "male",
    isVerified: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should register a user successfully", async () => {
    (db.query.userTable.findFirst as Mock).mockResolvedValue(null);

    (hashPassword as Mock).mockResolvedValue(
      "hashed-password",
    );

    (db.insert as Mock).mockReturnValue({
      values: () => ({
        returning: () => [mockUser],
      }),
    });

    (generateAccessToken as Mock).mockReturnValue(
      "access-token",
    );

    (generateRefreshToken as Mock).mockReturnValue(
      "refresh-token",
    );

    const result = await registerService({
      name: "Ayush",
      email: "ayush@gmail.com",
      password: "Password@123",
      gender: "male",
    });

    expect(result.user).toEqual(mockUser);
    expect(result.accessToken).toBe("access-token");
    expect(result.refreshToken).toBe("refresh-token");
  });

  it("should throw error if email already exists", async () => {
    (db.query.userTable.findFirst as Mock).mockResolvedValue(
      mockUser,
    );

    await expect(
      registerService({
        name: "Ayush",
        email: "ayush@gmail.com",
        password: "Password@123",
        gender: "male",
      }),
    ).rejects.toThrow(AppError);
  });

  it("should hash password correctly", async () => {
    (db.query.userTable.findFirst as Mock).mockResolvedValue(
      null,
    );

    (hashPassword as Mock).mockResolvedValue(
      "hashed-password",
    );

    (db.insert as Mock).mockReturnValue({
      values: () => ({
        returning: () => [mockUser],
      }),
    });

    (generateAccessToken as Mock).mockReturnValue(
      "access-token",
    );

    (generateRefreshToken as Mock).mockReturnValue(
      "refresh-token",
    );

    await registerService({
      name: "Ayush",
      email: "ayush@gmail.com",
      password: "Password@123",
      gender: "male",
    });

    expect(hashPassword).toHaveBeenCalledWith(
      "Password@123",
    );
  });

  it("should generate access token", async () => {
    await registerService({
      name: "Ayush",
      email: "ayush@gmail.com",
      password: "Password@123",
      gender: "male",
    });

    expect(generateAccessToken).toHaveBeenCalled();
  });

  it("should generate refresh token", async () => {
    await registerService({
      name: "Ayush",
      email: "ayush@gmail.com",
      password: "Password@123",
      gender: "male",
    });

    expect(generateRefreshToken).toHaveBeenCalled();
  });

  it("should store session in redis", async () => {
    await registerService({
      name: "Ayush",
      email: "ayush@gmail.com",
      password: "Password@123",
      gender: "male",
    });

    expect(storeSession).toHaveBeenCalledWith(
      mockUser.publicId,
      "refresh-token",
    );
  });

  it("should publish UserRegisterInit event", async () => {
    await registerService({
      name: "Ayush",
      email: "ayush@gmail.com",
      password: "Password@123",
      gender: "male",
    });

    expect(publish).toHaveBeenCalledWith(
      "user.register.init",
      expect.objectContaining({
        eventName: "UserRegisterInit",
      }),
    );
  });

  it("should publish UserRegisterSuccess event", async () => {
    await registerService({
      name: "Ayush",
      email: "ayush@gmail.com",
      password: "Password@123",
      gender: "male",
    });

    expect(publish).toHaveBeenCalledWith(
      "user.register.success",
      expect.objectContaining({
        eventName: "UserRegisterSuccess",
      }),
    );
  });

  it("should publish UserRegisterFailed event", async () => {
    (db.query.userTable.findFirst as Mock).mockResolvedValue(
      null,
    );

    (hashPassword as Mock).mockResolvedValue(
      "hashed-password",
    );

    (db.insert as Mock).mockReturnValue({
      values: () => ({
        returning: () => [],
      }),
    });

    await expect(
      registerService({
        name: "Ayush",
        email: "ayush@gmail.com",
        password: "Password@123",
        gender: "male",
      }),
    ).rejects.toThrow(AppError);

    expect(publish).toHaveBeenCalledWith(
      "user.register.failed",
      expect.objectContaining({
        eventName: "UserRegisterFailed",
      }),
    );
  });
});
import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";

import verifyOtpService from "@/services/account/verify.service.js";

import db from "@/index.js";
import { verifyOtp, deleteOtp } from "@/services/redis/otp.redis.js";
import { publish } from "@/rabbitmq/event.pubSub.js";
import { AppError } from "@/utils/error.util.js";

vi.mock("@/index");
vi.mock("@/services/redis/otp.redis");
vi.mock("@/rabbitmq/event.pubSub");

describe("Verify OTP Service", () => {
  const mockData = {
    publicId: "user-public-id",
    email: "ayush@gmail.com",
    otp: "123456",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setupSuccessMocks = () => {
    (verifyOtp as Mock).mockResolvedValue(true);

    (db.update as Mock).mockReturnValue({
      set: () => ({
        where: () => ({
          returning: () => [
            {
              publicId: mockData.publicId,
            },
          ],
        }),
      }),
    });

    (deleteOtp as Mock).mockResolvedValue(undefined);
  };

  it("should verify OTP successfully", async () => {
    setupSuccessMocks();

    const result = await verifyOtpService(mockData);

    expect(result).toEqual({
      isVerified: true,
    });
  });

  it("should reject invalid OTP", async () => {
    (verifyOtp as Mock).mockResolvedValue(false);

    await expect(verifyOtpService(mockData)).rejects.toThrow(AppError);
  });

  it("should reject expired OTP", async () => {
    (verifyOtp as Mock).mockResolvedValue(false);

    await expect(verifyOtpService(mockData)).rejects.toThrow(AppError);
  });

  it("should update isVerified", async () => {
    setupSuccessMocks();

    await verifyOtpService(mockData);

    expect(db.update).toHaveBeenCalled();
  });

  it("should delete OTP after successful verification", async () => {
    setupSuccessMocks();

    await verifyOtpService(mockData);

    expect(deleteOtp).toHaveBeenCalledWith(mockData.email);
  });

  it("should publish verification init event", async () => {
    await verifyOtpService(mockData);

    expect(publish).toHaveBeenCalledWith(
      "user.email.otp.verification.init",
      expect.objectContaining({
        eventName: "EmailOtpVerificationInit",
      }),
    );
  });

  it("should publish verification success event", async () => {
    await verifyOtpService(mockData);

    expect(publish).toHaveBeenCalledWith(
      "user.email.otp.verification.success",
      expect.objectContaining({
        eventName: "EmailOtpVerificationSuccess",
      }),
    );
  });

  it("should publish verification failed event", async () => {
    vi.mocked(verifyOtp).mockResolvedValue(false);

    await expect(verifyOtpService(mockData)).rejects.toThrow(AppError);

    expect(publish).toHaveBeenCalledWith(
      "user.email.otp.verification.failed",
      expect.objectContaining({
        eventName: "EmailOtpVerificationFailed",
      }),
    );
  });
});

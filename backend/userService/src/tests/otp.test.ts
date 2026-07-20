import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";

import otpService from "@/services/account/otp.service.js";

import transporter from "@/configs/mail.config.js";
import { otpGenerator } from "@/utils/essential.util.js";
import { storeOtp, deleteOtp } from "@/services/redis/otp.redis.js";
import { publish } from "@/rabbitmq/event.pubSub.js";
import { AppError } from "@/utils/error.util.js";

vi.mock("@/configs/mail.config");
vi.mock("@/utils/essential.util");
vi.mock("@/services/redis/otp.redis");
vi.mock("@/rabbitmq/event.pubSub");

describe("OTP Service", () => {
  const mockData = {
    name: "Ayush",
    email: "ayush@gmail.com",
  };

  const mockMailResponse = {
    messageId: "123456",
    accepted: ["ayush@gmail.com"],
    rejected: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setupSuccessMocks = () => {
    (otpGenerator as Mock).mockReturnValue("123456");

    (storeOtp as Mock).mockResolvedValue(undefined);

    (transporter.sendMail as Mock).mockResolvedValue(mockMailResponse);
  };

  it("should generate OTP", async () => {
    setupSuccessMocks();

    await otpService(mockData);

    expect(otpGenerator).toHaveBeenCalled();
  });

  it("should store OTP", async () => {
    setupSuccessMocks();

    await otpService(mockData);

    expect(storeOtp).toHaveBeenCalledWith(mockData.email, "123456");
  });

  it("should send email", async () => {
    setupSuccessMocks();

    await otpService(mockData);

    expect(transporter.sendMail).toHaveBeenCalled();
  });

  it("should return nodemailer response", async () => {
    setupSuccessMocks();

    const result = await otpService(mockData);

    expect(result).toEqual(mockMailResponse);
  });

  it("should delete OTP if email sending fails", async () => {
    (otpGenerator as Mock).mockReturnValue("123456");

    (storeOtp as Mock).mockResolvedValue(undefined);

    (transporter.sendMail as Mock).mockRejectedValue(new Error("Mail Error"));

    await expect(otpService(mockData)).rejects.toThrow(AppError);

    expect(deleteOtp).toHaveBeenCalledWith(mockData.email);
  });

  it("should publish OTP init event", async () => {
    setupSuccessMocks();

    await otpService(mockData);

    expect(publish).toHaveBeenCalledWith(
      "user.email.otp.init",
      expect.objectContaining({
        eventName: "EmailOtpInit",
      }),
    );
  });

  it("should publish OTP success event", async () => {
    setupSuccessMocks();

    await otpService(mockData);

    expect(publish).toHaveBeenCalledWith(
      "user.email.otp.success",
      expect.objectContaining({
        eventName: "EmailOtpSuccess",
      }),
    );
  });

  it("should publish OTP error event", async () => {
    (otpGenerator as Mock).mockReturnValue("123456");

    (storeOtp as Mock).mockResolvedValue(undefined);

    (transporter.sendMail as Mock).mockRejectedValue(new Error("Mail Error"));

    await expect(otpService(mockData)).rejects.toThrow(AppError);

    expect(publish).toHaveBeenCalledWith(
      "user.email.otp.error",
      expect.objectContaining({
        eventName: "EmailOtpError",
      }),
    );
  });
});

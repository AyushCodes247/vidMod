import { describe, it, expect, vi, beforeEach } from "vitest";

import healthService from "@/services/health/health.service.js";

import db from "@/index.js";
import redis from "@/configs/redis.config.js";
import { getChannel } from "@/rabbitmq/config.js";

vi.mock("@/index.js");
vi.mock("@/configs/redis.config.js");
vi.mock("@/rabbitmq/config.js");

describe("Health Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return healthy status", async () => {
    vi.mocked(db.execute).mockResolvedValue(true as never);

    vi.mocked(redis.ping).mockResolvedValue("PONG");

    vi.mocked(getChannel).mockReturnValue({} as never);

    const result = await healthService();

    expect(result.success).toBe(true);
    expect(result.status).toBe("healthy");

    expect(result.dependencies.postgresql).toBe("connected");
    expect(result.dependencies.redis).toBe("connected");
    expect(result.dependencies.rabbitmq).toBe("connected");
  });

  it("should return unhealthy if PostgreSQL fails", async () => {
    vi.mocked(db.execute).mockRejectedValue(new Error("PostgreSQL Failed"));

    vi.mocked(redis.ping).mockResolvedValue("PONG");

    vi.mocked(getChannel).mockReturnValue({} as never);

    const result = await healthService();

    expect(result.success).toBe(false);
    expect(result.status).toBe("unhealthy");
    expect(result.dependencies.postgresql).toBe("disconnected");
  });

  it("should return unhealthy if Redis fails", async () => {
    vi.mocked(db.execute).mockResolvedValue(true as never);

    vi.mocked(redis.ping).mockRejectedValue(new Error("Redis Failed"));

    vi.mocked(getChannel).mockReturnValue({} as never);

    const result = await healthService();

    expect(result.success).toBe(false);
    expect(result.status).toBe("unhealthy");
    expect(result.dependencies.redis).toBe("disconnected");
  });

  it("should return unhealthy if RabbitMQ fails", async () => {
    vi.mocked(db.execute).mockResolvedValue(true as never);

    vi.mocked(redis.ping).mockResolvedValue("PONG");

    vi.mocked(getChannel).mockImplementation(() => {
      throw new Error("RabbitMQ Failed");
    });

    const result = await healthService();

    expect(result.success).toBe(false);
    expect(result.status).toBe("unhealthy");
    expect(result.dependencies.rabbitmq).toBe("disconnected");
  });
});

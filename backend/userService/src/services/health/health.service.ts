import db from "@/index.js";
import redis from "@/configs/redis.config.js";
import { getChannel } from "@/rabbitmq/config.js";
import { time } from "@/utils/essential.util.js";

const healthService = async () => {
  const dependencies = {
    postgresql: "connected",
    redis: "connected",
    rabbitmq: "connected",
  };

  try {
    await db.execute("SELECT 1");
  } catch {
    dependencies.postgresql = "disconnected";
  }

  try {
    await redis.ping();
  } catch {
    dependencies.redis = "disconnected";
  }

  try {
    getChannel();
  } catch {
    dependencies.rabbitmq = "disconnected";
  }

  const isHealthy = Object.values(dependencies).every(
    (status) => status === "connected",
  );

  return {
    success: isHealthy,
    service: "User Service",
    status: isHealthy ? "healthy" : "unhealthy",
    timestamp: time(),
    uptime: process.uptime(),
    dependencies,
  };
};

export default healthService;
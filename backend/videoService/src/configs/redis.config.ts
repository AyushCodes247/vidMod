import { Redis } from "ioredis";
import env from "./dotenv.config.js";
import logger from "@utils/logger.util.js";

export const redis = new Redis({
  host: env.REDIS_HOST,
  password: env.REDIS_PASSWORD,
  port: env.REDIS_PORT,

  lazyConnect: true,

  enableReadyCheck: true,

  maxRetriesPerRequest: 3,

  maxLoadingRetryTime: 1_000,
});

redis.on("connect", (): void => {
  logger.info(`Redis connected successfully.`);
});

redis.on("ready", (): void => {
  logger.info(`Redis is ready.`);
});

redis.on("error", (error: unknown): void => {
  logger.error(`Redis error.: ${error}`);
});

export const bullMQRedis = new Redis({
  host: env.REDIS_HOST,

  port: env.REDIS_PORT,

  password: env.REDIS_PASSWORD,

  maxRetriesPerRequest: null,
});

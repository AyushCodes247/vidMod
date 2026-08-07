import { Redis } from "ioredis";
import env from "./dotenv.config.js";
import logger from "@utils/logger.util.js";

const redis = new Redis({
  host: env.REDIS_HOST,
  password: env.REDIS_PASSWORD,
  port: env.REDIS_PORT,

  maxRetriesPerRequest: 3,

  lazyConnect: true,

  enableReadyCheck: true,

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

export default redis;

import { Redis } from "ioredis";
import env from "./dotenv.config.js";
import { time } from "@utils/essential.util.js";

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
  console.info(`[${time()}] Redis connected successfully.`);
});

redis.on("ready", (): void => {
  console.info(`[${time()}] Redis is ready.`);
});

redis.on("error", (error: unknown): void => {
  console.error(`[${time()}] Redis error.: ${error}`);
});

export const bullMQRedis = new Redis({
  host: env.REDIS_HOST,

  port: env.REDIS_PORT,

  password: env.REDIS_PASSWORD,

  maxRetriesPerRequest: null,
});

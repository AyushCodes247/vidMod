import { Redis } from "ioredis";
import env from "./dotenv.config.js";
import { time } from "@utils/essential.util.js";

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
  console.info(`[${time()}] Redis connected successfully.`);
});

redis.on("ready", (): void => {
  console.info(`[${time()}] Redis is ready.`);
});

redis.on("error", (error: unknown): void => {
  console.error(`[${time()}] Redis error.: ${error}`);
});

export default redis;

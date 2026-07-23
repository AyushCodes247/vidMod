import dotenv from "dotenv";
dotenv.config();

interface dotenvTypes {
  PORT: number;
  REDIS_HOST: string;
  REDIS_PASSWORD: string;
  REDIS_PORT: number;
  NODE_ENV: string;
  RABBITMQ_URI: string;
  MONGOURI: string;
  ORIGIN_URI: string;
  MAX_VIDEO_SIZE: number;
  JWT_ACCESS_TOKEN: string;
  VIDEO_STORAGE_PATH: string;
}

const env: dotenvTypes = {
  PORT: Number(process.env.PORT),
  REDIS_HOST: process.env.REDIS_HOST!,
  REDIS_PORT: Number(process.env.REDIS_PORT),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD!,
  NODE_ENV: process.env.NODE_ENV!,
  RABBITMQ_URI: process.env.RABBITMQ_URI!,
  MONGOURI: process.env.MONGOURI!,
  ORIGIN_URI: process.env.ORIGIN_URI!,
  MAX_VIDEO_SIZE: Number(process.env.MAX_VIDEO_SIZE),
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN!,
  VIDEO_STORAGE_PATH: process.env.VIDEO_STORAGE_PATH!
};

export default env;

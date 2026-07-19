import dotenv from "dotenv";
dotenv.config();

interface envTypes {
  PORT: number;
  DATABASE_URL: string;
  REDIS_HOST: string;
  REDIS_PASSWORD: string;
  REDIS_PORT: number;
  NODE_ENV: string;
  JWT_ACCESS_TOKEN: string;
  JWT_REFRESH_TOKEN: string;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_SECURE: boolean;
  MAIL_FROM: string;
  RABBITMQ_URI: string;
  ORIGIN_URI: string;
}

const env: envTypes = {
  PORT: Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL!,
  REDIS_HOST: process.env.REDIS_HOST!,
  REDIS_PORT: Number(process.env.REDIS_PORT),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD!,
  NODE_ENV: process.env.NODE_ENV!,
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN!,
  JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN!,
  SMTP_USER: process.env.SMTP_USER!,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD!,
  SMTP_HOST: process.env.SMTP_HOST!,
  SMTP_PORT: Number(process.env.SMTP_PORT),
  SMTP_SECURE: process.env.SMTP_SECURE === "true",
  MAIL_FROM: process.env.MAIL_USER!,
  RABBITMQ_URI: process.env.RABBITMQ_URI!,
  ORIGIN_URI: process.env.ORIGIN_URI!
};

export default env;

import dotenv from "dotenv";
dotenv.config();

interface dotenvTypes {
  PORT: number;
  REDIS_HOST: string;
  REDIS_PASSWORD: string;
  REDIS_PORT: number;
  NODE_ENV: string;
  RABBITMQ_URI: string;
  MONGOURI : string;
  ORIGIN_URI: string;
}

const env: dotenvTypes = {
  PORT: Number(process.env.PORT),
  REDIS_HOST: process.env.REDIS_HOST!,
  REDIS_PORT: Number(process.env.REDIS_PORT),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD!,
  NODE_ENV: process.env.NODE_ENV!,
  RABBITMQ_URI: process.env.RABBITMQ_URI!,
  MONGOURI: process.env.MONGOURI!,
  ORIGIN_URI : process.env.ORIGIN_URI!
};

export default env;

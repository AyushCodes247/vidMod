import dotenv from "dotenv";
dotenv.config();

interface dotenvTypes {
  PORT: number;
  EVENT_STORE_SERVICE: string;
  USER_SERVICE: string;
  VIDEO_SERVICE: string;
  MODERATION_SERVICE: string;
}

const env: dotenvTypes = {
  PORT: Number(process.env.PORT),
  EVENT_STORE_SERVICE: process.env.EVENT_STORE_SERVICE!,
  USER_SERVICE: process.env.USER_SERVICE!,
  VIDEO_SERVICE: process.env.VIDEO_SERVICE!,
  MODERATION_SERVICE: process.env.MODERATION_SERVICE!
};

export default env;

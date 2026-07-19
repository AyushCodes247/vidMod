import dotenv from "dotenv";
dotenv.config();

interface dotenvTypes {
  PORT: number;
  EVENT_STORE_SERVICE: string | undefined;
  USER_SERVICE: string | undefined;
}

const env: dotenvTypes = {
  PORT: Number(process.env.PORT),
  EVENT_STORE_SERVICE: process.env.EVENT_STORE_SERVICE!,
  USER_SERVICE: process.env.USER_SERVICE!,
};

export default env;

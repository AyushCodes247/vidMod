import pino, { type LoggerOptions } from "pino";
import env from "@/configs/dotenv.config.js";

const isProduction = env.NODE_ENV?.toLowerCase() === "production";

const options: LoggerOptions = {
  level: isProduction ? "info" : "debug",
};

if (!isProduction) {
  options.transport = {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
      singleLine: false,
    },
  };
}

const logger = pino(options);

export default logger;

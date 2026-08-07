import app from "@/app.js";
import http from "http";
import env from "@configs/dotenv.config.js";
import { time } from "@utils/essential.util.js";
import redis from "@/configs/redis.config.js";
import { connectRabbitMQ } from "./rabbitmq/config.js";
import logger from "@utils/logger.util.js";

const PORT = env.PORT;
const server = http.createServer(app);

const startServer = async () => {
  await redis.connect();
  await connectRabbitMQ(env.RABBITMQ_URI);
  server.listen(PORT, () => {
    logger.info(`USER SERVICE IS RUNNING ON PORT NO.:${PORT}`);
  });
};

startServer();

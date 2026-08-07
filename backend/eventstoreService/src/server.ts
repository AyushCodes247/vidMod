import app from "./app.js";
import env from "@/configs/dotenv.config.js";
import http from "http";
import redis from "@configs/redis.config.js";
import { connectRabbitMQ } from "./rabbitmq/config.js";
import connectToDB from "./configs/db.config.js";
import createLog from "@services/create.service.js";
import logger from "@utils/logger.util.js";

const PORT = env.PORT;
const server = http.createServer(app);

const startServer = async () => {
  await connectToDB(env.MONGOURI);
  await redis.connect();
  await connectRabbitMQ(env.RABBITMQ_URI);
  await createLog();
  server.listen(PORT, () => {
    logger.info(
      `EVENTSTORE SERVICE IS RUNNING ON PORT NO.:${PORT}`,
    );
  });
};

startServer();

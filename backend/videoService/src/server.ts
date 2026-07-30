import app from "./app.js";
import env from "@/configs/dotenv.config.js";
import { time } from "@utils/essential.util.js";
import http from "http";
import { connectRabbitMQ } from "./rabbitmq/config.js";
import connectToDB from "./configs/db.config.js";
import moderationConsumer from "./consumers/moderation.consumer.js";
import { redis } from "./configs/redis.config.js";

const PORT = env.PORT;
const server = http.createServer(app);

const startServer = async () => {
  await redis.connect();
  await connectToDB(env.MONGOURI);
  await connectRabbitMQ(env.RABBITMQ_URI);
  await moderationConsumer();
  server.listen(PORT, () => {
    console.info(`[${time()}] VIDEO SERVICE IS RUNNING ON PORT NO.:${PORT}`);
  });
};

startServer();

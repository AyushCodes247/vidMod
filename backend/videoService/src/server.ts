import app from "./app.js";
import env from "@/configs/dotenv.config.js";
import { time } from "@utils/essential.util.js";
import http from "http";
import redis from "@configs/redis.config.js";
import { connectRabbitMQ } from "./rabbitmq/config.js";
import connectToDB from "./configs/db.config.js";
import moderationConsumer from "./consumers/moderation.consumer.js"; 

const PORT = env.PORT;
const server = http.createServer(app);

const startServer = async () => {
  await connectToDB(env.MONGOURI);
  await redis.connect();
  await connectRabbitMQ(env.RABBITMQ_URI);
  await moderationConsumer();
  server.listen(PORT, () => {
    console.info(
      `[${time()}] VIDEO SERVICE IS RUNNING ON PORT NO.:${PORT}`,
    );
  });
};

startServer();

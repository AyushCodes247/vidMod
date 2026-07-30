import { Queue } from "bullmq";
import { bullMQRedis } from "@/configs/redis.config.js";

const transcodeQueue = new Queue("transcode-queue", {
  connection: bullMQRedis,

  defaultJobOptions: {
    attempts: 3,

    backoff: {
      type: "exponential",
      delay: 2000,
    },

    removeOnComplete: {
      age: 1800,
      count: 100,
    },

    removeOnFail: {
      age: 86400,
      count: 100,
    },
  },
});

export default transcodeQueue;

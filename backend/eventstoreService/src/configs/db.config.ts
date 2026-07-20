import mongoose from "mongoose";
import { time } from "@/utils/essential.util.js";

const connectToDB = async (uri: string) => {
  try {
    await mongoose.connect(uri, {
      maxPoolSize: 50,
      maxIdleTimeMS: 60_000,
      heartbeatFrequencyMS: 10_000,
    });

    console.info(
      `[${time()}] EVENT STORE DATABASE CONNECTED SUCCESSFULLY.`,
    );
  } catch (error) {
    console.error(
      `[${time()}] ERROR CONNECTING TO EVENT STORE DATABASE : ${error}`,
    );

    process.exit(1);
  }

  ["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, async () => {
      await mongoose.disconnect();

      console.info(
        `[${time()}] EVENT STORE DATABASE DISCONNECTED SUCCESSFULLY.`,
      );

      process.exit(0);
    });
  });
};

export default connectToDB;
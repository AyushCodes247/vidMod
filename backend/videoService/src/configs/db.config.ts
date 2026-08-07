import mongoose from "mongoose";
import logger from "@utils/logger.util.js";

const connectToDB = async (uri: string) => {
  try {
    await mongoose.connect(uri, {
      maxPoolSize: 50,
      maxIdleTimeMS: 60_000,
      heartbeatFrequencyMS: 10_000,
    });

    logger.info(
      `VIDEO SERVICE DATABASE CONNECTED SUCCESSFULLY.`,
    );
  } catch (error) {
    logger.error(
      `ERROR CONNECTING TO EVENT STORE DATABASE : ${error}`,
    );

    process.exit(1);
  }

  ["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, async () => {
      await mongoose.disconnect();

      logger.info(
        `VIDEO SERVICE DATABASE DISCONNECTED SUCCESSFULLY.`,
      );

      process.exit(0);
    });
  });
};

export default connectToDB;
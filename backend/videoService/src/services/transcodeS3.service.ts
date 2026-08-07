import { QueueEvents } from "bullmq";
import path from "path";
import fs from "fs/promises";
import { readFileSync, writeFileSync } from "fs";

import { bullMQRedis } from "@/configs/redis.config.js";
import { VideoModel } from "@/models/video.model.js";
import transcodeJob from "@/transcode/job.js";
import { uploadS3 } from "@/utils/s3.util.js";
import logger from "@utils/logger.util.js";

const queueEvents = new QueueEvents("transcode-queue", {
  connection: bullMQRedis,
});

await queueEvents.waitUntilReady();

const sanitizePlaylist = (filePath: string) => {
  if (!filePath.endsWith(".m3u8")) {
    return;
  }

  const content = readFileSync(filePath, "utf8");

  const updated = content.replaceAll("\\", "/");

  writeFileSync(filePath, updated, "utf8");
};

const uploadDirectory = async (
  directory: string,
  videoId: string,
): Promise<string | null> => {
  let masterURI: string | null = null;

  const uploadRecursive = async (currentDirectory: string): Promise<void> => {
    const files = await fs.readdir(currentDirectory, {
      withFileTypes: true,
    });

    for (const file of files) {
      const absolutePath = path.join(currentDirectory, file.name);

      if (file.isDirectory()) {
        await uploadRecursive(absolutePath);

        continue;
      }

      if (file.name.endsWith(".m3u8")) {
        sanitizePlaylist(absolutePath);
      }

      const relativePath = path.relative(directory, absolutePath);

      const key = `hls/${videoId}/${relativePath}`.replaceAll("\\", "/");

      let fileType = "application/octet-stream";

      if (file.name.endsWith(".m3u8")) {
        fileType = "application/vnd.apple.mpegurl";
      } else if (file.name.endsWith(".ts")) {
        fileType = "video/mp2t";
      }

      const response = await uploadS3({
        key,
        filePath: absolutePath,
        fileType,
      });

      if (file.name === "master.m3u8" && response) {
        masterURI = response;
      }
    }
  };

  await uploadRecursive(directory);

  return masterURI;
};

const removeDirectory = async (directory: string): Promise<void> => {
  await fs.rm(directory, {
    recursive: true,
    force: true,
  });
};

queueEvents.on("progress", ({ jobId, data }) => {
  logger.info(`TRANSCODING JOB : ${jobId} : ${data}% COMPLETED.`);
});

type TranscodeResult = {
  videoId: string;
  hlsPath: string;
  outputDirectory: string;
  hasAudio: boolean;
  transcodedQualities: number;
};

queueEvents.on(
  "completed",

  async ({ jobId, returnvalue }) => {
    try {
      const r = returnvalue as unknown;
      const result = r as TranscodeResult;
      logger.info(`TRANSCODING JOB : ${jobId} COMPLETED.`);

      const masterURI = await uploadDirectory(
        result.outputDirectory,
        result.videoId,
      );

      if (!masterURI) {
        throw new Error("Failed to upload master playlist.");
      }

      await VideoModel.findOneAndUpdate(
        {
          publicVideoId: result.videoId,
        },
        {
          $set: {
            hlsPath: masterURI,
            status: "READY",
          },
        },
      );

      await removeDirectory(result.outputDirectory);

      logger.info(`VIDEO : ${result.videoId} IS READY TO STREAM.`);
    } catch (error) {
      logger.error(`TRANSCODING COMPLETION FAILED :${error}`);
    }
  },
);

queueEvents.on("failed", ({ jobId, failedReason }) => {
  logger.error(`TRANSCODING JOB : ${jobId} FAILED.`);

  logger.error(failedReason);
});

const transcodeService = async ({
  videoId,
  videoPath,
}: {
  videoId: string;
  videoPath: string;
}) => {
  const job = await transcodeJob({
    videoId,
    videoPath,
  });

  return job;
};

export default transcodeService;

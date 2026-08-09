import crypto from "crypto";
import type { Express } from "express";

import { publish } from "@/rabbitmq/event.pubSub.js";

interface UploadVideoType {
  userId: string | undefined;
  file: Express.Multer.File;
  videoId: string;
}

const uploadVideoService = async (data: UploadVideoType): Promise<void> => {
  const eventId = crypto.randomUUID();
  // Event Store.
  await publish("video.upload.init", {
    eventId,
    eventName: "VideoUploadInit",
    serviceName: "VIDEO_SERVICE",
    timestamp: new Date(),
    payload: {
      userId: data.userId,
      videoId: data.videoId,
      videoPath: data.file.path,
    },
  });

  await publish("video.moderation.init", {
    eventId,
    eventName: "VideoModerationInit",
    serviceName: "VIDEO_SERVICE",
    timestamp: new Date(),
    payload: {
      userId: data.userId,
      videoId: data.videoId,
      videoName: data.file.originalname,
      videoPath: data.file.path,
    },
  });
};

export default uploadVideoService;

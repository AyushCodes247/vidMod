import type { Request, Response } from "express";

import { asyncHandler } from "@/utils/essential.util.js";
import { getObject } from "@/utils/s3.util.js";
import { VideoModel } from "@/models/video.model.js";
import { AppError } from "@/utils/error.util.js";

const segmentController = asyncHandler(async (req: Request, res: Response) => {
  const { videoId, quality, segment } = req.params;

  const video = await VideoModel.findOne({
    publicVideoId: String(videoId),
    visibility : "Public"
  });

  if (!video) {
    throw new AppError("Video not found.", 404);
  }

  const response = await getObject(`hls/${videoId}/${quality}/${segment}`);

  if (!response.Body) {
    throw new AppError("Segment not found.", 404);
  }

  res.setHeader("Content-Type", "video/mp2t");

  (response.Body as NodeJS.ReadableStream).pipe(res);
});

export default segmentController;

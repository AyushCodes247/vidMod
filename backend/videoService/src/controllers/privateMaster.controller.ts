import type { Request, Response } from "express";

import { asyncHandler } from "@/utils/essential.util.js";
import { getObjectAsString } from "@/utils/s3.util.js";
import { VideoModel } from "@/models/video.model.js";
import { AppError } from "@/utils/error.util.js";

const privateMasterController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("unauthorized user", 401);
    }
    const { videoId } = req.params;

    const video = await VideoModel.findOne({
      publicVideoId: String(videoId),
      visibility: "Private",
    });

    if (!video) {
      throw new AppError("Video not found.", 404);
    }

    let playlist = await getObjectAsString(`hls/${videoId}/master.m3u8`);

    playlist = playlist.replaceAll(
      /v(\d+)\/index\.m3u8/g,
      (_, quality) => `/api/v1/videos/${videoId}/v${quality}/index.m3u8`,
    );

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");

    return res.send(playlist);
  },
);

export default privateMasterController;

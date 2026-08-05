import type { Request, Response } from "express";

import { asyncHandler } from "@/utils/essential.util.js";
import { getObjectAsString } from "@/utils/s3.util.js";
import { VideoModel } from "@/models/video.model.js";
import { AppError } from "@/utils/error.util.js";

const privatePlaylistController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("unauthorized user", 401);
    }
    const { videoId, quality } = req.params;

    const video = await VideoModel.findOne({
      publicVideoId: String(videoId),
      visibility: "Private",
    });

    if (!video) {
      throw new AppError("Video not found.", 404);
    }

    let playlist = await getObjectAsString(
      `hls/${videoId}/${quality}/index.m3u8`,
    );

    playlist = playlist.replaceAll(
      /seg_(\d+)\.ts/g,
      (_, segment) => `/api/v1/videos/${videoId}/${quality}/seg_${segment}.ts`,
    );

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");

    return res.send(playlist);
  },
);

export default privatePlaylistController;

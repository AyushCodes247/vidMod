import type { Request, Response } from "express";
import { asyncHandler } from "@/utils/essential.util.js";
import deleteVideoService from "@/services/delete.service.js";

const deleteVideo = asyncHandler(async (req: Request, res: Response) => {
  const { videoId } = req.params;

  const result = await deleteVideoService({
    videoId: String(videoId),
  });

  return res.status(200).json(result);
});

export default deleteVideo;

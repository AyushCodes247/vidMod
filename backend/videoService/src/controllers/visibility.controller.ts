import type { Request, Response } from "express";
import { asyncHandler } from "@/utils/essential.util.js";
import visibilityService from "@/services/visibility.service.js";
import { AppError } from "@/utils/error.util.js";

const visibilityController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized user.", 401);
    }

    const { videoId } = req.params;

    const { visibility } = req.body;

    const result = await visibilityService({
      videoId: String(videoId),
      visibility,
      ownerId: req.user.publicId,
    });

    return res.status(200).json(result);
  },
);

export default visibilityController;

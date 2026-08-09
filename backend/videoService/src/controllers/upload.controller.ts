import { asyncHandler } from "@/utils/essential.util.js";
import uploadVideoService from "@/services/upload.service.js";
import { AppError } from "@/utils/error.util.js";
import crypto from "crypto";

const uploadVideo = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError("Video file is required.", 400);
  }

  const videoId = crypto.randomUUID();

  const data = {
    userId: req.user?.publicId,
    file: req.file,
    videoId,
  };

  await uploadVideoService(data);

  return res.status(202).json({
    success: true,
    message: "Video uploaded successfully and queued for moderation.",
  });
});

export default uploadVideo;

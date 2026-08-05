import { VideoModel } from "@/models/video.model.js";
import { AppError } from "@/utils/error.util.js";

const visibilityService = async ({
  videoId,
  visibility,
  ownerId,
}: {
  videoId: string;
  visibility: string;
  ownerId: string;
}) => {
  const video = await VideoModel.findOne({
    publicVideoId: videoId,
  });

  if (!video) {
    throw new AppError("Video not found.", 404);
  }

  if (video.userId.toString() !== ownerId) {
    throw new AppError("Unauthorized request.", 403);
  }

  video.visibility = visibility;

  await video.save();

  return {
    success: true,

    message: "Video visibility updated successfully.",

    videoId: video.publicVideoId,

    visibility: video.visibility,
  };
};

export default visibilityService;

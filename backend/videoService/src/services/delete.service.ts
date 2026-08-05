import { deleteDirectory } from "@/utils/s3.util.js";
import { VideoModel } from "@/models/video.model.js";
import { AppError } from "@/utils/error.util.js";

const deleteVideoService = async ({ videoId }: { videoId: string }) => {
  const video = await VideoModel.findOne({
    publicVideoId: videoId,
  });

  if (!video) {
    throw new AppError("video not found.", 404);
  }

  const prefix = `hls/${videoId}/`;

  await deleteDirectory(prefix);

  await VideoModel.deleteOne({
    publicVideoId: videoId,
  });

  return {
    success: true,
    message: "Video deleted successfully.",
    videoId,
  };
};

export default deleteVideoService;

import queue from "@queues/transcode.queue.js";

type parmasType = {
  videoId: string;
  videoPath: string;
};

const transcodeJob = async ({
  videoId,
  videoPath,
}: parmasType): Promise<string> => {
  const job = await queue.add("transcode-queue", {
    videoId,
    videoPath,
  });

  return job.id!;
};

export default transcodeJob;

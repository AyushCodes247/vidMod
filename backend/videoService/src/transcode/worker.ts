import { Worker , type Job} from "bullmq";
import { bullMQRedis } from "@/configs/redis.config.js";
import { spawn, spawnSync } from "child_process";
import path from "path";
import fs from "fs";
import logger from "@utils/logger.util.js";

const QUALITIES = [
  { w: 256, h: 144, br: "150k" },
  { w: 426, h: 240, br: "300k" },
  { w: 640, h: 360, br: "800k" },
  { w: 854, h: 480, br: "1400k" },
  { w: 1280, h: 720, br: "3000k" },
  { w: 1920, h: 1080, br: "6000k" },
  { w: 2560, h: 1440, br: "16000k" },
  { w: 3840, h: 2160, br: "25000k" },
];

const getSuitableBitrate = (height: number): string => {
  if (height <= 144) return "150k";

  if (height <= 240) return "300k";

  if (height <= 360) return "800k";

  if (height <= 480) return "1400k";

  if (height <= 720) return "3000k";

  if (height <= 1080) return "6000k";

  if (height <= 1440) return "16000k";

  return "25000k";
};

const OUT_DIR = path.resolve(process.cwd(), "storage", "hls");

const getDuration = (file: string): number => {
  const result = spawnSync(
    "ffprobe",
    [
      "-v",
      "error",

      "-show_entries",
      "format=duration",

      "-of",
      "default=nk=1:nw=1",

      file,
    ],
    {
      encoding: "utf-8",
    },
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(result.stderr);
  }

  return parseFloat(result.stdout.trim());
};

const hasAudio = (file: string): boolean => {
  const result = spawnSync(
    "ffprobe",
    [
      "-v",
      "error",

      "-select_streams",
      "a",

      "-show_entries",
      "stream=index",

      "-of",
      "csv=p=0",

      file,
    ],
    {
      encoding: "utf-8",
    },
  );

  if (result.status !== 0) {
    return false;
  }

  return result.stdout.trim().length > 0;
};

const getResolution = (
  file: string,
): {
  width: number;
  height: number;
} => {
  const result = spawnSync(
    "ffprobe",
    [
      "-v",
      "error",

      "-select_streams",
      "v:0",

      "-show_entries",
      "stream=width,height",

      "-of",
      "csv=s=x:p=0",

      file,
    ],
    {
      encoding: "utf-8",
    },
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(result.stderr);
  }

  const output = result.stdout.trim();

  const [width, height]: any = output.split("x").map(Number);

  return {
    width,
    height,
  };
};

const getFPS = (file: string): number => {
  const result = spawnSync(
    "ffprobe",
    [
      "-v",
      "error",

      "-select_streams",
      "v:0",

      "-show_entries",
      "stream=r_frame_rate",

      "-of",
      "default=nk=1:nw=1",

      file,
    ],
    {
      encoding: "utf-8",
    },
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(result.stderr);
  }

  const output = result.stdout.trim();

  const [numerator, denominator]: any = output.split("/").map(Number);

  return Math.round(numerator / denominator);
};

const toSeconds = (value: string): number => {
  const [h, m, s] = value.split(":");

  return Number(h) * 3600 + Number(m) * 60 + Number(s);
};

new Worker(
  "transcode-queue",

  async (job: Job) => {
    logger.info(`PROCESSING TRANSCODING JOB : ${job.id}`);
    const { videoId, videoPath } = job.data;

    const absoluteVideoPath = path.resolve(videoPath);

    const duration = getDuration(absoluteVideoPath);

    const resolution = getResolution(absoluteVideoPath);

    const videoHasAudio = hasAudio(absoluteVideoPath);

    const detectedFPS = getFPS(absoluteVideoPath);

    const fps = Number.isFinite(detectedFPS) ? detectedFPS : 30;

    const gopSize = fps * 2;

    const qualities = QUALITIES.filter(
      (quality) =>
        quality.w <= resolution.width && quality.h <= resolution.height,
    );

    if (!qualities.length) {
      qualities.push({
        w: resolution.width,
        h: resolution.height,
        br: getSuitableBitrate(resolution.height),
      });
    }

    const videoDir = path.join(OUT_DIR, videoId);

    fs.mkdirSync(videoDir, {
      recursive: true,
    });

    qualities.forEach((_, index) => {
      fs.mkdirSync(path.join(videoDir, `v${index}`), {
        recursive: true,
      });
    });

    const filterComplex = qualities
      .map(
        (q, index) => `[0:v]scale=${q.w}:${q.h}:flags=fast_bilinear[v${index}]`,
      )
      .join(";");

    const args = [
      "-i",
      absoluteVideoPath,

      "-filter_complex",
      filterComplex,

      "-preset",
      "veryfast",

      "-movflags",
      "+faststart",

      "-profile:v",
      "high",

      "-level",
      "4.1",

      "-pix_fmt",
      "yuv420p",

      "-g",
      String(gopSize),

      "-keyint_min",
      String(gopSize),

      "-sc_threshold",
      "0",

      "-threads",
      "0",
    ];

    qualities.forEach((quality, index) => {
      args.push("-map", `[v${index}]`);

      if (videoHasAudio) {
        args.push("-map", "0:a:0");
      }

      args.push(
        `-c:v:${index}`,
        "libx264",

        `-b:v:${index}`,
        quality.br,
      );

      if (videoHasAudio) {
        args.push(
          `-c:a:${index}`,
          "aac",

          `-b:a:${index}`,
          "128k",

          "-ac",
          "2",
        );
      }
    });

    const streamMap = qualities
      .map((_, index) =>
        videoHasAudio ? `v:${index},a:${index}` : `v:${index}`,
      )
      .join(" ");

    const outputPattern = path.posix.join(
      videoDir.replaceAll("\\", "/"),
      "v%v",
      "index.m3u8",
    );

    const segmentPattern = path.posix.join(
      videoDir.replaceAll("\\", "/"),
      "v%v",
      "seg_%03d.ts",
    );

    args.push(
      "-f",
      "hls",

      "-hls_time",
      "6",

      "-hls_playlist_type",
      "vod",

      "-hls_list_size",
      "0",

      "-hls_flags",
      "independent_segments",

      "-master_pl_name",
      "master.m3u8",

      "-hls_segment_filename",

      segmentPattern,

      "-var_stream_map",
      streamMap,

      outputPattern,

      "-y",
    );

    return new Promise((resolve, _reject) => {
      const ffmpeg = spawn("ffmpeg", args);
      let _ffmpegLogs = "";

      ffmpeg.stderr.on(
        "data",

        async (data) => {
          const output = data.toString();

          _ffmpegLogs += output;

          const match = output.match(/time=(\d+:\d+:\d+\.\d+)/);

          if (!match) {
            return;
          }

          if (duration > 0) {
            const progress = Math.min(
              100,

              Math.floor((toSeconds(match[1]) / duration) * 100),
            );

            await job.updateProgress(progress);
          }
        },
      );

      ffmpeg.on("close", (code) => {
        if (code === 0) {
          logger.info(`TRANSCODING JOB : ${job.id} : COMPLETED.`);

          if (fs.existsSync(absoluteVideoPath)) {
            try {
              if (fs.existsSync(absoluteVideoPath)) {
                fs.unlinkSync(absoluteVideoPath);
              }
            } catch (error) {
              logger.error(error);
            }
          }

          const masterPath = path.join(videoDir, "master.m3u8");

          logger.info(
            `MASTER EXISTS : ${fs.existsSync(masterPath)}`,
          );

          resolve({
            videoId,
            hlsPath: `hls/${videoId}/master.m3u8`,
            outputDirectory: videoDir,
            hasAudio: videoHasAudio,
            transcodedQualities: qualities.length,
          });
        } else {
          try {
            fs.rmSync(videoDir, {
              recursive: true,
              force: true,
            });
          } catch (error) {
            logger.error(error);
          }
        }
      });

      ffmpeg.on("error", (_error) => {
        try {
          fs.rmSync(videoDir, {
            recursive: true,
            force: true,
          });
        } catch (error) {
          logger.error(error);
        }
      });
    });
  },

  {
    connection: bullMQRedis,

    concurrency: 2,
  },
);

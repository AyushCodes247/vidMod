import { subscribe } from "@/rabbitmq/event.pubSub.js";
import { publish } from "@/rabbitmq/event.pubSub.js";
import { VideoModel } from "@models/video.model.js";
import crypto from "crypto";

const moderationConsumer = async () => {
  await subscribe(
    "vidmod.moderation.result.queue",
    "video.moderation.result",

    async (data) => {
      console.info("MODERATION RESULT RECEIVED");

      const generalData = {
        eventId: data.eventId,
        eventName: data.eventName,
        serviceName: data.serviceName,
        userId: data.userId,
        videoName: data.videoName,
        status: data.status,
        videoId: data.videoId,
      };

      console.log(data);

      const moderationData = {
        decision: data.decision,

        framesProcessed: data.framesProcessed,

        safeFrames: data.safeFrames,

        sensitiveFrames: data.sensitiveFrames,

        explicitFrames: data.explicitFrames,

        safePercentage: data.safePercentage,

        sensitivePercentage: data.sensitivePercentage,

        explicitPercentage: data.explicitPercentage,

        explicitScore: data.explicitScore,

        sensitiveScore: data.sensitiveScore,

        explicitScorePercentage: data.explicitScorePercentage,

        sensitiveScorePercentage: data.sensitiveScorePercentage,

        averageExplicitConfidence: data.averageExplicitConfidence,

        averageSensitiveConfidence: data.averageSensitiveConfidence,

        highestConfidence: data.highestConfidence,

        highestPrediction: data.highestPrediction,

        highestExplicitPrediction: data.highestExplicitPrediction,

        highestSensitivePrediction: data.highestSensitivePrediction,

        processingTimeMs: data.processingTimeMs,

        modelVersion: data.modelVersion,
      };

      /**
       * Moderation failed.
       */

      if (generalData.status === "FAILED") {
        console.error("VIDEO MODERATION FAILED.");

        await publish("event.video.failed", {
          eventId: crypto.randomUUID(),

          eventName: "VideoModerationFailed",

          serviceName: "VIDEO_SERVICE",

          timestamp: new Date(),

          payload: {
            userId: generalData.userId,

            videoId: generalData.videoId,

            videoName: generalData.videoName,
          },
        });

        return;
      }

      /**
       * Reject blocked / unsafe videos.
       */

      if (
        moderationData.decision === "UNSAFE" ||
        moderationData.decision === "BLOCKED"
      ) {
        console.error("VIDEO REJECTED.");

        await publish("event.video.rejected", {
          eventId: crypto.randomUUID(),

          eventName: "VideoRejected",

          serviceName: "VIDEO_SERVICE",

          timestamp: new Date(),

          payload: {
            userId: generalData.userId,

            videoId: generalData.videoId,

            videoName: generalData.videoName,

            decision: moderationData.decision,
          },
        });

        return;
      }

      /**
       * Save SAFE and
       * SENSITIVE videos.
       */

      try {
        await VideoModel.create({
          userId: generalData.userId,

          publicVideoId: generalData.videoId,

          videoName: generalData.videoName,

          moderationResult: moderationData,
        });

        console.info("VIDEO CREATED SUCCESSFULLY.");

        await publish("event.video.created", {
          eventId: crypto.randomUUID(),

          eventName: "VideoCreated",

          serviceName: "VIDEO_SERVICE",

          timestamp: new Date(),

          payload: {
            userId: generalData.userId,

            videoId: generalData.videoId,

            videoName: generalData.videoName,

            decision: moderationData.decision,
          },
        });
      } catch (error) {
        console.error(error);

        await publish("event.video.failed", {
          eventId: crypto.randomUUID(),

          eventName: "VideoCreateFailed",

          serviceName: "VIDEO_SERVICE",

          timestamp: new Date(),

          payload: {
            userId: generalData.userId,

            videoId: generalData.videoId,

            videoName: generalData.videoName,
          },
        });
      }
    },
  );
};

export default moderationConsumer;

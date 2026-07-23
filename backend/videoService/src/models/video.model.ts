import { Schema, model } from "mongoose";

export type ModerationDecision =
  | "SAFE"
  | "SENSITIVE"
  | "UNSAFE"
  | "BLOCKED";

export interface Prediction {
  label: string;
  confidence: number;
}

export interface ModerationResult {
  decision: ModerationDecision;

  framesProcessed: number;

  safeFrames: number;
  sensitiveFrames: number;
  explicitFrames: number;

  safePercentage: number;
  sensitivePercentage: number;
  explicitPercentage: number;

  explicitScore: number;
  sensitiveScore: number;

  explicitScorePercentage: number;
  sensitiveScorePercentage: number;

  averageExplicitConfidence: number;
  averageSensitiveConfidence: number;

  highestConfidence: number;

  highestPrediction?: Prediction | null;

  highestExplicitPrediction?: Prediction | null;

  highestSensitivePrediction?: Prediction | null;

  processingTimeMs: number;

  modelVersion: string;
}

export interface VideoModelDT {
  userId: string;
  publicVideoId: string;
  videoName: string;
  moderationResult: ModerationResult;
}

const predictionSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },

    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
  },
  {
    _id: false,
  },
);

const moderationSchema = new Schema(
  {
    decision: {
      type: String,
      enum: [
        "SAFE",
        "SENSITIVE",
        "UNSAFE",
        "BLOCKED",
      ],
      required: true,
    },

    framesProcessed: {
      type: Number,
      required: true,
      min: 0,
    },

    safeFrames: {
      type: Number,
      required: true,
      min: 0,
    },

    sensitiveFrames: {
      type: Number,
      required: true,
      min: 0,
    },

    explicitFrames: {
      type: Number,
      required: true,
      min: 0,
    },

    safePercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    sensitivePercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    explicitPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    explicitScore: {
      type: Number,
      required: true,
      min: 0,
    },

    sensitiveScore: {
      type: Number,
      required: true,
      min: 0,
    },

    explicitScorePercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    sensitiveScorePercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    averageExplicitConfidence: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },

    averageSensitiveConfidence: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },

    highestConfidence: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },

    highestPrediction: {
      type: predictionSchema,
      default: null,
    },

    highestExplicitPrediction: {
      type: predictionSchema,
      default: null,
    },

    highestSensitivePrediction: {
      type: predictionSchema,
      default: null,
    },

    processingTimeMs: {
      type: Number,
      required: true,
      min: 0,
    },

    modelVersion: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const videoSchema = new Schema<VideoModelDT>(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },

    publicVideoId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    videoName: {
      type: String,
      required: true,
      trim: true,
    },

    moderationResult: {
      type: moderationSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


/**
 * Compound Indexes
 */

// Get newest videos of a user.
videoSchema.index({
  userId: 1,
  createdAt: -1,
});

// Get a particular video.
videoSchema.index({
  userId: 1,
  publicVideoId: 1,
});


/**
 * Single Field Indexes
 */

// Search by public id.
videoSchema.index({
  publicVideoId: 1,
});


export const VideoModel = model<VideoModelDT>(
  "Video",
  videoSchema,
);
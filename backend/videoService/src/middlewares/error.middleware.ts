import type { ErrorRequestHandler } from "express";
import multer from "multer";

import { AppError } from "@utils/error.util.js";
import env from "@configs/dotenv.config.js";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let error: AppError;

  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        error = new AppError(
          "Video file size exceeds the allowed limit.",
          400,
          err,
        );
        break;

      case "LIMIT_FILE_COUNT":
        error = new AppError("Only one video file can be uploaded.", 400, err);
        break;

      case "LIMIT_UNEXPECTED_FILE":
        error = new AppError("Unexpected file field provided.", 400, err);
        break;

      default:
        error = new AppError(err.message, 400, err);
    }
  } else if (err instanceof AppError) {
    error = err;
  } else {
    error = new AppError(
      "Internal server error",
      500,
      err instanceof Error ? err : undefined,
    );
  }

  const response: Record<string, unknown> = {
    success: false,
    status: error.status,
    message: error.message,
  };

  if (env.NODE_ENV !== "PRODUCTION") {
    response.error = {
      name: error.name,
      statusCode: error.statusCode,
      stack: error.stack,
      cause: error.cause,
    };
  }

  res.status(error.statusCode).json(response);
};

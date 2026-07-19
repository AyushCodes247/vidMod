import type { ErrorRequestHandler } from "express";
import { AppError } from "@utils/error.util.js";
import env from "@configs/dotenv.config.js";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let error: AppError;

  if (err instanceof AppError) {
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

  if (env.NODE_ENV !== "production") {
    response.error = {
      name: error.name,
      statusCode: error.statusCode,
      stack: error.stack,
      cause: error.cause,
    };
  }

  res.status(error.statusCode).json(response);
};

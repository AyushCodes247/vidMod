import expressProxy from "express-http-proxy";

import type { NextFunction, Response } from "express";

import logger from "@utils/logger.util.js";

interface ProxyOptions {
  parseReqBody?: boolean;
  timeout?: number;
  pathPrefix?: string;
}

export const createProxy = (
  target: string,
  { parseReqBody = true, timeout = 5000, pathPrefix = "" }: ProxyOptions = {},
) =>
  expressProxy(target, {
    parseReqBody,
    timeout,

    proxyReqPathResolver(req) {
      if (!pathPrefix) {
        return req.originalUrl;
      }

      return req.originalUrl.replace(pathPrefix, "");
    },

    proxyReqOptDecorator(proxyReqOpts, srcReq) {
      logger.info(
        `PROXY REQUEST -> ${srcReq.method} ${srcReq.originalUrl} (${target})`,
      );

      return proxyReqOpts;
    },

    userResDecorator(_proxyRes, proxyResData, userReq, _userRes) {
      logger.info(
        `PROXY SUCCESS -> ${userReq.method} ${userReq.originalUrl}`,
      );

      return proxyResData;
    },

    proxyErrorHandler(err: Error, res: Response, _next: NextFunction) {
      logger.error(`PROXY ERROR -> ${err}`);

      if ((err as NodeJS.ErrnoException).code === "ECONNREFUSED") {
        return res.status(503).json({
          success: false,
          message: "Service unavailable.",
        });
      }

      return res.status((err as unknown as { statusCode: number }).statusCode ?? 500).json({
        success: false,
        message: "Internal Server Error.",
      });
    },
  });

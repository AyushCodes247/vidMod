import expressProxy from "express-http-proxy";

import type { NextFunction, Response } from "express";

import { time } from "@configs/essential.config.js";

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
      console.info(
        `[${time()}] PROXY REQUEST -> ${srcReq.method} ${srcReq.originalUrl} (${target})`,
      );

      return proxyReqOpts;
    },

    userResDecorator(_proxyRes, proxyResData, userReq, _userRes) {
      console.info(
        `[${time()}] PROXY SUCCESS -> ${userReq.method} ${userReq.originalUrl}`,
      );

      return proxyResData;
    },

    proxyErrorHandler(err: Error, res: Response, _next: NextFunction) {
      console.error(`[${time()}] PROXY ERROR -> ${err}`);

      if ((err as NodeJS.ErrnoException).code === "ECONNREFUSED") {
        return res.status(503).json({
          success: false,
          message: "Service unavailable.",
        });
      }

      return res.status((err as any).statusCode ?? 500).json({
        success: false,
        message: "Internal Server Error.",
      });
    },
  });

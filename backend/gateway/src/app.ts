import express from "express";
import { createProxy } from "@utils/crateProxy.util.js";
import env from "@configs/dotenv.config.js";

const app = express();
app.use(express.json({ limit: "6gb" }));
app.use(express.urlencoded({ extended: true, limit: "6gb" }));

app.use(
  "/api/v1/users",
  createProxy(env.USER_SERVICE, {
    pathPrefix: "/api/v1/users",
  }),
);
app.use(
  "/api/v1/events",
  createProxy(env.EVENT_STORE_SERVICE, {
    pathPrefix: "/api/v1/events",
  }),
);
app.use(
  "/api/v1/videos",
  createProxy(env.VIDEO_SERVICE, {
    parseReqBody: false,
    timeout: 0,
    pathPrefix: "/api/v1/videos",
  }),
);
app.use("/api/v1/moderation", createProxy(String(env.MODERATION_SERVICE)));

export default app;

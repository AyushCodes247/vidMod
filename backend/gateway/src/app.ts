import express from "express";
import { createProxy } from "@utils/crateProxy.util.js";
import env from "@configs/dotenv.config.js";

const app = express();

app.use("/api/v1/users", createProxy(String(env.USER_SERVICE)));
app.use("/api/v1/events", createProxy(String(env.EVENT_STORE_SERVICE)));
app.use("/api/v1/video", createProxy(String(env.VIDEO_SERVICE)));

export default app;

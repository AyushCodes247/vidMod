import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import router from "@routes/index.route.js";
import env from "@configs/dotenv.config.js";
import { errorHandler } from "@middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: env.ORIGIN_URI,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(helmet());

app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", router);

app.use(errorHandler);

export default app;

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

const app = express();

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

export default app;
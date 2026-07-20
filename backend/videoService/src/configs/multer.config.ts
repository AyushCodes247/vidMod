import multer from "multer";
import fs from "fs";
import path from "path";
import crypto from "crypto";

import env from "./dotenv.config.js";
import { AppError } from "@/utils/error.util.js";

import type { Request } from "express";
import type { FileFilterCallback } from "multer";

const uploadPath = path.join(process.cwd(), "uploads", "videos");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb) => {
    cb(null, uploadPath);
  },

  filename: (_req: Request, file: Express.Multer.File, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    const fileName = `${Date.now()}-${crypto.randomUUID()}${extension}`;

    cb(null, fileName);
  },
});

const allowedMimeTypes = [
  "video/mp4",
  "video/webm",
  "video/x-matroska",
  "video/quicktime",
];

const fileFilter: multer.Options["fileFilter"] = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new AppError("Only MP4, WEBM, MKV and MOV videos are allowed.", 400),
    );
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    files: 1,
    fields: 10,
    fileSize: Number(env.MAX_VIDEO_SIZE),
  },
});

export default upload;

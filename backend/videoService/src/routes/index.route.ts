import { Router } from "express";
import upload from "@/configs/multer.config.js";
import verifyUser from "@/middlewares/user.middleware.js";
import uploadVideo from "@/controllers/upload.controller.js";

const router = Router();

router.post("/upload", verifyUser, upload.single("video"), uploadVideo);

export default router;
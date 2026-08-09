import { Router } from "express";
import upload from "@/configs/multer.config.js";
import verifyUser from "@/middlewares/user.middleware.js";
import uploadVideo from "@/controllers/upload.controller.js";
import masterController from "@/controllers/master.controller.js";
import playlistController from "@/controllers/playlist.controller.js";
import segmentController from "@/controllers/segment.controller.js";
import deleteVideo from "@/controllers/delete.controller.js";
import generateAccessTokenController from "@/controllers/access.controller.js";
import reGenerateAccessTokenController from "@/controllers/reaccess.controller.js";
import verifyAccess from "@/middlewares/access.middleware.js";

const router = Router();

router.post("/generate-access", verifyUser, generateAccessTokenController);

router.post("/regenerate-access", verifyUser, reGenerateAccessTokenController);

router.post("/upload", verifyAccess, upload.single("video"), uploadVideo);

router.get("/:videoId/master", masterController);

router.get("/:videoId/:quality/index.m3u8", playlistController);

router.get("/:videoId/:quality/:segment", segmentController);

router.delete("/:videoId", verifyUser, deleteVideo);

export default router;

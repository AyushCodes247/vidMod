import { Router } from "express";
import upload from "@/configs/multer.config.js";
import verifyUser from "@/middlewares/user.middleware.js";
import uploadVideo from "@/controllers/upload.controller.js";
import masterController from "@/controllers/master.controller.js";
import playlistController from "@/controllers/playlist.controller.js";
import segmentController from "@/controllers/segment.controller.js";
import deleteVideo from "@/controllers/delete.controller.js";
import privateMasterController from "@/controllers/privateMaster.controller.js";
import privatePlaylistController from "@/controllers/privatePlaylist.controller.js";
import privateSegmentController from "@/controllers/privateSegment.controller.js";
import visibilityController from "@/controllers/visibility.controller.js";

const router = Router();

router.post("/upload", verifyUser, upload.single("video"), uploadVideo);

router.get("/:videoId/master", masterController);

router.get("/:videoId/:quality/index.m3u8", playlistController);

router.get("/:videoId/:quality/:segment", segmentController);

router.delete("/:videoId", verifyUser, deleteVideo);

router.get("/pr/:videoId/master", verifyUser, privateMasterController);

router.get(
  "/pr/:videoId/:quality/index.m3u8",
  verifyUser,
  privatePlaylistController,
);

router.get(
  "/pr/:videoId/:quality/:segment",
  verifyUser,
  privateSegmentController,
);

router.patch("/:videoId/visibility", verifyUser, visibilityController);

export default router;

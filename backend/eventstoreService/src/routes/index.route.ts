import { Router } from "express";
import { router as EventRouter } from "./events/index.route.js";

const router = Router();

router.use("/event", EventRouter);

export default router;

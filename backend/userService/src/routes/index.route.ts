import { Router } from "express";
import { router as auth } from "./authentication/index.route.js";
import { router as account } from "./account/index.route.js";
import { router as health } from "./health/index.route.js";

const router = Router();

router.use("/auth", auth);
router.use("/account", account);
router.use("/health", health);

export default router;
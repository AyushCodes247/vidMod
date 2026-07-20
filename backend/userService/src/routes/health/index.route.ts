import { Router } from "express";
import health from "@/controller/health/health.controller.js";

export const router = Router();

router.get("/", health);
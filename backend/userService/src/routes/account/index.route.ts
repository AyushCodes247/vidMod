import { Router } from "express";
import verifyUser from "@/middlewares/user.middleware.js";
import profile from "@/controller/account/profile.controller.js";
import otp from "@/controller/account/otp.controller.js";
import verifyOtp from "@/controller/account/verify-otp.controller.js";

export const router = Router();

router.get("/profile", verifyUser, profile);

router.post("/generate-otp", verifyUser, otp);
router.post("/verify-otp", verifyUser, verifyOtp);
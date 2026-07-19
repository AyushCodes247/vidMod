import { Router } from "express";
import { registerBodyValidator, loginBodyValidator } from "../validator.js";
import register from "@/controller/authentication/register.controller.js";
import verifyUser from "@/middlewares/user.middleware.js";
import logout from "@/controller/authentication/logout.controller.js";
import login from "@/controller/authentication/login.controller.js";
import refresh from "@/controller/authentication/refresh.controller.js";

export const router = Router();

router.post("/register", registerBodyValidator, register);
router.post("/login", loginBodyValidator, login);
router.post("/refresh", refresh);

router.post("/logout", verifyUser, logout);

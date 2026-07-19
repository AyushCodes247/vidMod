import { asyncHandler } from "@/utils/essential.util.js";
import env from "@/configs/dotenv.config.js";
import { validationResult } from "express-validator";
import registerService from "@/services/authentication/register.service.js";

const REFRESH_COOKIE = "vidmod_userservice_cookie";

const register = asyncHandler(async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: error.array(),
    });
  }

  const { name, email, password, gender } = req.body;

  const { user, accessToken, refreshToken } = await registerService({
    name,
    email,
    password,
    gender,
  });

  const isProduction = env.NODE_ENV === "PRODUCTION";

  res.cookie(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  return res.status(201).json({
    success: true,
    message: "User registered successfully.",
    user,
    accessToken,
  });
});

export default register;

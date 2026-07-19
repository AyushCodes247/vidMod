import { asyncHandler } from "@/utils/essential.util.js";
import env from "@/configs/dotenv.config.js";
import logoutService from "@/services/authentication/logout.service.js";

const REFRESH_COOKIE = "vidmod_userservice_cookie";

const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.[REFRESH_COOKIE];

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "refresh token is missing",
    });
  }

  await logoutService(refreshToken);

  const isProduction = env.NODE_ENV === "PRODUCTION";

  res.clearCookie(REFRESH_COOKIE, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "User logged out successfully.",
  });
});

export default logout;
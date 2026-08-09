import { asyncHandler } from "@/utils/essential.util.js";
import { TokenModel } from "@/models/accessToken.model.js";
import { AppError } from "@/utils/error.util.js";
import jwt from "jsonwebtoken";
import env from "@/configs/dotenv.config.js";

const ACCESS_ISSUER = "vidmod_videoservice";
const ACCESS_AUDIENCE = "vidmod_videoservice_api";

interface TokenPayload {
  publicId: string;
  name: string;
}

const verifyAccess = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new AppError("Unauthorized", 401);
  }

  let payload;
  try {
    payload = jwt.verify(token, env.VIDEO_ACCESS_SECRET, {
      issuer: ACCESS_ISSUER,
      audience: ACCESS_AUDIENCE,
    }) as TokenPayload;
  } catch {
    throw new AppError("Unauthorized", 401);
  }

  const t = await TokenModel.findOne({ publicId: payload.publicId });
  const isRight = await t?.compareToken(token);
  if (!isRight) {
    throw new AppError("Invalid Access Token", 401);
  }

  req.user = {
    publicId: payload.publicId,
    name: payload.name,
  };

  return next();
});

export default verifyAccess;

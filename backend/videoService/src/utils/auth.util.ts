import jwt from "jsonwebtoken";
import env from "@/configs/dotenv.config.js";

export interface TokenPayload {
  publicId: string;
  name: string;
}

const JWT_ISSUER = "vidmod_userservice";
const JWT_AUDIENCE = "vidmod_userservice_api";

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_ACCESS_TOKEN!, {
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  }) as TokenPayload;
};
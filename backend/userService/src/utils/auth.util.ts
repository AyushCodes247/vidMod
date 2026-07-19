import env from "@/configs/dotenv.config.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export interface TokenPayload {
  publicId: string;
  name: string;
}

const JWT_ISSUER = "vidmod_userservice";
const JWT_AUDIENCE = "vidmod_userservice_api";

const ACCESS_TOKEN_EXPIRY = "20m";
const REFRESH_TOKEN_EXPIRY = "7d";

const ARGON2_OPTIONS: argon2.Options & { type: typeof argon2.argon2id } = {
  type: argon2.argon2id,
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
};

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_ACCESS_TOKEN, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
    algorithm: "HS256",
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_REFRESH_TOKEN, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
    algorithm: "HS256",
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_ACCESS_TOKEN!, {
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  }) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_REFRESH_TOKEN!, {
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  }) as TokenPayload;
};

export const hashPassword = (password: string): Promise<string> => {
  return argon2.hash(password, ARGON2_OPTIONS);
};

export const verifyPassword = (
  hashedPassword: string,
  plainPassword: string,
): Promise<boolean> => {
  return argon2.verify(hashedPassword, plainPassword);
};

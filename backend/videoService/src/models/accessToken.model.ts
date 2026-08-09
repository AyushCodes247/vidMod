import { Schema, model, Document, Model } from "mongoose";
import env from "@/configs/dotenv.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface AccessTokenSchemaType extends Document {
  publicId: String;
  name: String;
  token: String;
  generateServiceAccessToken(): string;
  compareToken(candidateToken: string): Promise<boolean>;
}

interface AccessTokenModelType extends Model<AccessTokenSchemaType> {
  hashAccessToken(token: string): Promise<string>;
}

const ACCESS_ISSUER = "vidmod_videoservice";
const ACCESS_AUDIENCE = "vidmod_videoservice_api";

const AccessSchema = new Schema<AccessTokenSchemaType, AccessTokenModelType>(
  {
    publicId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

AccessSchema.index({ publicId: 1, token: 1 });

AccessSchema.methods.generateServiceAccessToken = function (): string {
  return jwt.sign(
    { publicId: this.publicId, name: this.name },
    env.VIDEO_ACCESS_SECRET,
    {
      algorithm: "HS256",
      issuer: ACCESS_ISSUER,
      audience: ACCESS_AUDIENCE,
    },
  );
};

AccessSchema.methods.compareToken = async function (
  candidateToken: string,
): Promise<boolean> {
  return await bcrypt.compare(candidateToken, this.token);
};

AccessSchema.statics.hashAccessToken = async function (
  token: string,
): Promise<string> {
  return await bcrypt.hash(token, 10);
};

export const TokenModel = model<AccessTokenSchemaType, AccessTokenModelType>(
  "Access",
  AccessSchema,
);

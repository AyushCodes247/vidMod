import { asyncHandler } from "@/utils/essential.util.js";
import { AppError } from "@/utils/error.util.js";
import { TokenModel } from "@/models/accessToken.model.js";

const generateAccessTokenController = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user?.publicId || !user.name) {
    throw new AppError("Unauthorized", 401);
  }

  const isExists = await TokenModel.findOne({ publicId: user.publicId });
  if (isExists) {
    throw new AppError("Token Already Exists. Try Regenrating.", 400);
  }

  const t = await TokenModel.create({
    publicId: user.publicId,
    name: user.name,
  });
  const AccessToken = t.generateServiceAccessToken();
  const hashedToken = await TokenModel.hashAccessToken(AccessToken);
  t.token = hashedToken;
  await t.save();

  return res.status(201).json({
    success: true,
    message: "Successfully generated one time access token.",
    AccessToken,
  });
});

export default generateAccessTokenController;

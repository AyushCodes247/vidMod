import { asyncHandler } from "@/utils/essential.util.js";
import { AppError } from "@/utils/error.util.js";
import { TokenModel } from "@/models/accessToken.model.js";

const reGenerateAccessTokenController = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user?.publicId || !user.name) {
    throw new AppError("Unauthorized", 401);
  }

  const isExists = await TokenModel.findOne({ publicId: user.publicId });
  if (!isExists) {
    throw new AppError("Token dose not exists. Try Generating.", 400);
  }

  const t = isExists.generateServiceAccessToken();
  const hashedToken = await TokenModel.hashAccessToken(t);

  isExists.token = hashedToken;
  await isExists.save();

  return res.status(201).json({
    success: true,
    message: "Successfully regenerated one time access token.",
    AccessToken: t,
  });
});

export default reGenerateAccessTokenController;

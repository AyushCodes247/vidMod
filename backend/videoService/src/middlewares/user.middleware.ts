import { asyncHandler } from "@utils/essential.util.js";
import { verifyAccessToken } from "@/utils/auth.util.js";
import { AppError } from "@/utils/error.util.js";

const verifyUser = asyncHandler(async (req, res, next) => {
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
    payload = verifyAccessToken(token);
  } catch {
    throw new AppError("Unauthorized", 401);
  }

  req.user = {
    publicId: payload.publicId,
    name: payload.name,
  };

  return next();
});

export default verifyUser;

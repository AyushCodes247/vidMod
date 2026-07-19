import { asyncHandler } from "@/utils/essential.util.js";
import otpService from "@/services/account/otp.service.js";

const otp = asyncHandler(async (req, res) => {
  const info = await otpService({
    name: req.user?.name,
    email: req.user?.email,
  });

  return res.status(200).json({
    success: true,
    message: "Verification OTP sent successfully.",
    email: req.user?.email,
    mail: info,
  });
});

export default otp;

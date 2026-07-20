import { asyncHandler } from "@/utils/essential.util.js";
import healthService from "@/services/health/health.service.js";

const health = asyncHandler(async (req, res) => {
  const data = await healthService();

  return res.status(data.success ? 200 : 503).json(data);
});

export default health;

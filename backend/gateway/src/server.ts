import app from "./app.js";
import http from "http";
import env from "@configs/dotenv.config.js";
import logger from "@utils/logger.util.js";

const PORT = env.PORT;
const server = http.createServer(app);

server.listen(PORT, () => {
    logger.info(`GATEWAY IS RUNNING ON PORT NO.:${PORT}`);
});

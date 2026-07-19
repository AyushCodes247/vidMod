import app from "./app.js";
import http from "http";
import env from "@configs/dotenv.config.js";
import { time } from "@configs/essential.config.js";

const PORT = env.PORT;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.info(`[${time()}] GATEWAY IS RUNNING ON PORT NO.:${PORT}`);
});

import env from "@configs/dotenv.config.js";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@db/schema.js";

const db = drizzle(env.DATABASE_URL, {
  schema,
});

export default db;

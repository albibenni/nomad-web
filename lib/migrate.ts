import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: "@/.env" });

const connectionString = process.env.POSTGRES_URL || "";
const sql = postgres(connectionString, { max: 1 });
export const db = drizzle(sql);

await migrate(db, { migrationsFolder: "@/drizzle" });

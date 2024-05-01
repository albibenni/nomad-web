import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import { users } from "@/lib/user";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const reset = async () => {
  const connectionString = process.env.POSTGRES_URL || "";
  const sqlData = postgres(connectionString, { max: 1 });
  const db = drizzle(sqlData);

  console.log("Start delete database");

  const query = sql.raw(`ALTER SEQUENCE users_id_seq RESTART WITH 1`);
  console.log("delete data");

  await db.delete(users);
  try {
    await db.execute(query);
    console.log("reset database");
  } catch (error) {
    console.log("error reset database");
  }
};

reset();

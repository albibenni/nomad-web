import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import { users } from "@/lib/user";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const main = async () => {
  const connectionString = process.env.POSTGRES_URL || "";
  const sqlData = postgres(connectionString, { max: 1 });
  const db = drizzle(sqlData);

  const data: (typeof users.$inferInsert)[] = [];

  for (let i = 0; i < 30; i++) {
    data.push({
      name: `name${i}`,
      email: `email${i}@prova.it`,
    });
  }

  console.log("Seed delete");
  const query = sql.raw(`ALTER SEQUENCE users_id_seq RESTART WITH 1`);
  await db.delete(users);
  try {
    await db.execute(query);
    console.log("reset database");
  } catch (error) {
    console.log("error reset database");
  }

  console.log("Seed start");
  await db.insert(users).values(data);
  console.log("Seed done");
};

main();

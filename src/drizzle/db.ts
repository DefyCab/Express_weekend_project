import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import "dotenv/config";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error("A database url is required");
}

const client = postgres(dbUrl);

export const db = drizzle(client, {
  schema,
  logger: true,
});

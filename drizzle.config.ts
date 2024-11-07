import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // pattern features
  schema: "./src/drizzle/schema.ts",
  // "./src/features/**/db-schema.ts"
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});

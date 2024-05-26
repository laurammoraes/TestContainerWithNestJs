import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "src/infra/providers/database/drizzle/schema.ts",
  out: "./drizzle",
});
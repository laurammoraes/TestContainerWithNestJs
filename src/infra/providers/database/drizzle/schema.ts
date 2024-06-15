import {  text, timestamp, pgTable, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id"),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
  deletedAt: timestamp("deletedAt")
});
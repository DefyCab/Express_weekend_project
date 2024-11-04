import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const StudentsTable = pgTable("students", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  age: integer("age").notNull(),
});

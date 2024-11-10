import { integer, pgTable, uuid, varchar, jsonb } from "drizzle-orm/pg-core";

export const StudentsTable = pgTable("students", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  age: integer("age").notNull(),
});

export const CoursesTable = pgTable("courses", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("studentId").notNull(),
  courses: jsonb("courses").notNull(),
});

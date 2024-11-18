import { db } from "../../drizzle/db";
import { CoursesTable } from "../../drizzle/schema";

export const createDb = () => {
  return {
    getAll: async () => await db.select().from(CoursesTable),
  };
};

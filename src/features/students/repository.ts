import { StudentsTable } from "../../drizzle/schema";
import { db } from "../../drizzle/db";
import { eq } from "drizzle-orm";
import { Student } from ".";

export const createDB = () => {
  return {
    getAll: async () => await db.select().from(StudentsTable),

    getStudent: async (id: string) => {
      const student = await db
        .select()
        .from(StudentsTable)
        .where(eq(StudentsTable.id, id));
      return student;
    },

    createStudent: async (student: Student) => {
      await db.insert(StudentsTable).values({
        name: student.name,
        email: student.email,
        age: student.age,
      });
    },

    updateStudent: async (student: Partial<any>) => {
      await db
        .update(StudentsTable)
        .set({
          ...(student.name && { name: student.name }),
          ...(student.email && { email: student.email }),
          ...(student.age && { age: student.age }),
        })
        .where(eq(StudentsTable.id, student.id));
    },

    deleteStudent: async (id: string) => {
      await db.delete(StudentsTable).where(eq(StudentsTable.id, id));
    },
  };
};

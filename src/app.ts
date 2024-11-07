import express from "express";
import { createStudentsFeature } from "./features";
import cors from "cors";
import { Student } from "./features";
import { StudentsTable } from "./drizzle/schema";
import { db } from "./drizzle/db";
import { eq } from "drizzle-orm";

const createDB = () => {
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
          ...(student.email && { name: student.email }),
          ...(student.age && { name: student.age }),
        })
        .where(eq(StudentsTable.id, student.id));
    },

    deleteStudent: async (id: string) => {
      await db.delete(StudentsTable).where(eq(StudentsTable.id, id));
    },
  };
};

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  const db = createDB();

  // drizzle db
  const studentsFeature = createStudentsFeature(db);

  // well?
  app.get("/", (req, res) => {
    res.json([]);
  });

  app.use("/api/v1/students", studentsFeature.getRouter());

  return app;
};

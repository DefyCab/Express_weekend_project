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

    //   getOneStudent: (id: string) => {
    //     return students.find((student) => student.id === id);
    //   },

    createStudent: async (student: Student) => {
      await db.insert(StudentsTable).values({
        name: student.name,
        email: student.email,
        age: student.age,
      });
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

  const studentsFeature = createStudentsFeature(db);

  app.get("/", (req, res) => {
    res.json([]);
  });

  app.use("/api/v1/students", studentsFeature.getRouter());

  return app;
};

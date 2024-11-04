import express from "express";
import { createStudentsFeature } from "./features";
import cors from "cors";
import { Student } from "./features";
import STUDENTS from "./fixtures/students.json";

const createDB = () => {
  let students: Student[] = STUDENTS;

  return {
    getAll: () => students,

    getOneStudent: (id: string) => {
      return students.find((student) => student.id === id);
    },

    createStudent: (student: Student) => {
      students = [...students, student];
      return students;
    },

    deleteStudent: (id: string) => {
      const studentToRemove = students.findIndex(
        (student) => student.id === id
      );
      students = students.slice(studentToRemove, (students.length - 1));
      return students;
    },
  };
};

const db = createDB();

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  const studentsFeature = createStudentsFeature(db);

  app.get("/", (req, res) => {
    res.json([]);
  });

  app.use("/api/v1/students", studentsFeature.getRouter());

  return app;
};

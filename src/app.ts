import express from "express";
import { createStudentsFeature } from "./features";
import cors from "cors";
// import { v4 as uuidv4 } from "uuid";
import { Student } from "./features";
import STUDENTS from "./fixtures/students.json"

const createDB = () => {
  const students: Student[] = STUDENTS

  return {
    getAll: () => students,

    getStudentById: (id: string) => {
      return students.find((student) => student.id === id);
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

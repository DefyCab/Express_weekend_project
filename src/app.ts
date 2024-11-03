import express from "express";
import { createStudentsFeature } from "./features";
import cors from "cors";
// import { v4 as uuidv4 } from "uuid";
import { Student } from "./features";

const createDB = () => {
  const students: Student[] = [
    {
      id: "bdb4a301-c5b9-492c-bdb2-daded15e7198",
      name: "Love",
    },
    {
      id: "ghb4a502-b6b9-152c-tyt2-laded15e8891",
      name: "Erik Starrin",
    },
  ];

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

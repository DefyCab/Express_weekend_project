import express from "express";
import { createStudentsFeature } from "./features/students/features";
import cors from "cors";
import { createDB } from "./features/students/db";
import { createCoursesFeature } from "./features/courses/features";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  const db = createDB();

  const studentsFeature = createStudentsFeature();
  const coursesFeature = createCoursesFeature();

  app.get("/", (req, res) => {
    res.send("Goto /api/v1/students or /api/v1/courses");
  });

  app.use("/api/v1/students", studentsFeature.service.getRouter());
  app.use("/api/v1/courses", coursesFeature.service.getRouter());

  return app;
};

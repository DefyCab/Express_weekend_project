import express from "express";
import { createStudentsFeature } from "./features/students/features";
import cors from "cors";
import { createDB } from "./features/students/db";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  const db = createDB();

  const studentsFeature = createStudentsFeature();

  app.get("/", (req, res) => {
    res.json([]);
  });

  app.use("/api/v1/students", studentsFeature.service.getRouter());

  return app;
};

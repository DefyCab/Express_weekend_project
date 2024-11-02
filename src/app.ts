import express from "express";
import { createStudentsFeature } from "./features";
import cors from "cors";

export const createApp = () => {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.get("/status", (req, res) => {
    res.json({ status: "ready" });
  });

  const studentsFeature = createStudentsFeature();

  app.get("/", (req, res) => {
    res.json([]);
  });
  
  app.use("/api/v1/students", studentsFeature.getRouter());

  return app;
};

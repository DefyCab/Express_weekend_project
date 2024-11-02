import express from "express";
import { createStudentsFeature } from "./features";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const createDB = () => {
  const Students = [
    {
      id: uuidv4(),
      name: "Love",
    },
  ];

  return {
    getAll: async () => Students,
  };
};

const db = createDB();

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  const studentsFeature = createStudentsFeature();

  app.get("/", (req, res) => {
    res.json([]);
  });

  app.use("/api/v1/students", studentsFeature.getRouter());

  return app;
};

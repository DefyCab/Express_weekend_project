import { Router } from "express";

export const createStudentsFeature = (db) => {
  return {
    getRouter() {
      const router = Router();

      router.get("/", async (req, res) => {
        const students = await db.getAll();
        res.json(students);
      });

      return router;
    },
  };
};

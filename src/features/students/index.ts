import { Router } from "express";
import { z } from "zod";

const StudentSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Student = z.infer<typeof StudentSchema>;

export const createStudentsFeature = (db) => {
  return {
    getRouter() {
      const router = Router();

      router.get("/", async (req, res) => {
        const students: Student = await db.getAll();
        res.json(students);
      });

      return router;
    },
  };
};

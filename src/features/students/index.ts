import { Router } from "express";
import { z } from "zod";

const StudentSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Student = z.infer<typeof StudentSchema>;

export const createStudentsFeature = (db :any) => {
  return {
    getRouter() {
      const router = Router();

      router.get("/", async (req, res) => {
        const students: Student = await db.getAll();
        res.json(students);
      });

      router.get("/:id"), async (req, res) => {
        const student: Student = await db.getStudentById()
        res.json(student)
      }

      return router;
    },
  };
};

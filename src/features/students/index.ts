import { Router } from "express";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const StudentSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Student = z.infer<typeof StudentSchema>;

export const createStudentsFeature = (db: any) => {
  return {
    getRouter() {
      const router = Router();

      router.get("/", async (req, res) => {
        const students: Student[] = await db.getAll();
        res.status(200);
        res.json(students);
      });

      router.get("/:id", async (req, res) => {
        const { id } = req.params;
        const student: Student = await db.getOneStudent(id);

        res.json(student);
      });

      router.post("/", async (req, res) => {
        const student = StudentSchema.safeParse({
          id: req.body.id,
          name: req.body.name,
        });

        if (student.success === true) {
          const students = await db.createStudent(student.data);
          res.status(201);
          res.json(students);
        } else {
          res.json(student.error);
        }
      });

      router.delete("/:id", async (req, res) => {
        const { id } = req.params;
        const students = await db.deleteStudent(id);
        res.json(students);
      });

      return router;
    },
  };
};

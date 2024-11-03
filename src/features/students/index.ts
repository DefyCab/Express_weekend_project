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
        res.json(students);
      });

      router.get("/:id", async (req, res) => {
        const { id } = req.params;
        const student: Student = await db.getStudentById(id);
        res.json(student);
      });

      router.post("/", async (req, res) => {
        // const student = StudentSchema.safeParse({
        //   id: uuidv4(),
        //   name: req.query.name,
        // });

        const id = uuidv4()

        const student = {
          id: req.body.id,
          name: req.body.name,
        };

        const students = await db.createStudent(student);
        res.json(students);
      });

      return router;
    },
  };
};

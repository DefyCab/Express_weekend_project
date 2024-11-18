import { Router } from "express";
import { z } from "zod";

const StudentSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number(),
});

const updateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  age: z.number().optional(),
});

const idSchema = z.string().uuid();

export type Student = z.infer<typeof StudentSchema>;

export const createService = (db: any) => {
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
        if (!idSchema.safeParse(id)) {
          res.end({ message: "Wrong Id" });
        }
        const student: Student = await db.getStudent(id);
        if (student) {
          res.status(200).json(student);
        } else {
          res.status(404).json({ message: "No student with that Id" });
        }
      });

      router.post("/", async (req, res) => {
        const student = StudentSchema.safeParse({
          name: req.body.name,
          email: req.body.email,
          age: req.body.age,
        });

        try {
          if (!student.success) {
            throw new Error(student.error?.message);
          }
          const students: Student[] = await db.createStudent(student.data);
          res.status(201).json(students);
        } catch (error) {
          res.status(409).json({ error: error.message });
        }
      });

      router.patch("/:id", async (req: any, res: any) => {
        const { id } = req.params;
        const body = req.body;
        const student = await db.getStudent(id);

        const updatedValues = updateSchema.safeParse({
          name: body.name,
          email: body.email,
          age: body.age,
        });

        try {
          if (!updatedValues.success) {
            throw new Error("Validation error");
          }

          const updatedStudent = {
            id: id,
            name: updatedValues.data.name || student.name,
            email: updatedValues.data.email || student.email,
            age: updatedValues.data.age || student.age,
          };
          res.status(200).json(await db.updateStudent(updatedStudent));
        } catch (error) {
          res.status(409).json({ error: error.message });
        }
      });

      router.delete("/:id", async (req, res) => {
        const { id } = req.params;
        const students = await db.deleteStudent(id);
        res.status(204).json(students);
      });

      return router;
    },
  };
};

import { Router } from "express";
import { z } from "zod";

const StudentSchema = z.object({
  name: z.string(),
  email: z.string(),
  age: z.number(),
});

const idSchema = z.string().uuid();

export type Student = z.infer<typeof StudentSchema>;

// createDB for students
// db.ts fil
export const createStudentsFeature = (db: any) => {
  // const db createdb(drizzledb)
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
          if (student.success === true) {
            const students: Student[] = await db.createStudent(student.data);
            res.status(201).json(students);
          }
        } catch (error) {
          res.status(409).json({ message: "Validation Error" });
        }
      });

      // PATCH method to update a student by ID
      router.patch("/:id", async (req: any, res: any) => {
        const { id } = req.params;
        const body = req.body;
        const student = await db.getStudent(id);
        console.log(student)
        console.log(body)
        console.log(id)

        const updatedStudent = {
          id: id,
          name: student.name || body.name,
          email: student.email || body.email,
          age: student.age || body.age,
        };

        res.json(await db.updateStudent(updatedStudent));
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

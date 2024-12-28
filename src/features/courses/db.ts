import { db } from "../../drizzle/db";
import { eq } from "drizzle-orm";
import { CoursesTable } from "../../drizzle/schema";

export const createDb = () => {
  return {
    getAll: async () => await db.select().from(CoursesTable),

    getStudentCourses: async (id: string) => {
      const res = await db
        .select()
        .from(CoursesTable)
        .where(eq(CoursesTable.studentId, id));

      const courses = res.flatMap((student) => student.courses);

      return courses;
    },

    getStudentsGraders: {},

    updateCourseStatus: {},

    updateStudentsGrade: {},
  };
};

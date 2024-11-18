import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { CoursesTable } from "../../drizzle/schema";


export const createDb = () => {
  return {
    getAll: async () => await db.select().from(CoursesTable),

    getStudentCourses: async (id: string) => {
      const res = await db
        .select({ courses: CoursesTable.courses })
        .from(CoursesTable);

      const flat = res.flat().map((student) => student.courses);

      const retur = flat.flat().map((student) => student);

      return retur;
    },

    getStudentsGraders: {},

    updateCourseStatus: {},

    updateStudentsGrade: {},
  };
};

import { createDb } from "./db";
import { createService } from "./service";

export const createCoursesFeature = () => {
  const db = createDb();
  const service = createService(db);

  return { service };
};

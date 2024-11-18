import { createDB } from "./db";
import { createService } from "./service";

export const createStudentsFeature = () => {
  const db = createDB();
  const service = createService(db);

  return { service };
};

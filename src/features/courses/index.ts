import { Router } from "express";

export const createCoursesFeature = () => {
  return {
    getRouter() {
      const router = Router();
      return router;
    },
  };
};

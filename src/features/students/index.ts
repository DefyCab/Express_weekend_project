import { Router } from "express";

export const createStudentsFeature = () => {
  return {
    getRouter() {
      const router = Router();

      router.get("/", (req, res) => {
        res.json([]);
      });

      return router;
    },
  };
};

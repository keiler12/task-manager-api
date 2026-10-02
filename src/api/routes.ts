import { Router } from "express";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Task Manager API funcionando correctamente",
  });
});

export default router;
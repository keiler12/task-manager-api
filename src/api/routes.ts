import { Router } from "express";
import authRoutes from "./auth.routes.js";
import taskRoutes from "./task.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Task Manager API funcionando correctamente",
  });
});

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);

export default router;
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import taskRoutes from "./task.routes.js";
import {
  authenticateToken,
  AuthenticatedRequest,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Task Manager API funcionando correctamente",
  });
});

router.get(
  "/protected",
  authenticateToken,
  (req: AuthenticatedRequest, res) => {
    res.status(200).json({
      message: "Acceso autorizado",
      user: req.user,
    });
  }
);

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);

export default router;
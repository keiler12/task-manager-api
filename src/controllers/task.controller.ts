import { Request, Response } from "express";
import {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
} from "../services/task.service.js";
import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";

export async function createTask(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const userId = req.user!.userId;

    const {
      titulo,
      descripcion,
      fecha_vencimiento,
      estado,
    } = req.body;

    const task = await createTaskService(
      userId,
      titulo,
      descripcion ?? null,
      fecha_vencimiento,
      estado
    );

    res.status(201).json({
      message: "Tarea creada correctamente",
      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
}

export async function getTasks(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const userId = req.user!.userId;

    const tasks = await getTasksService(userId);

    res.status(200).json({
      tasks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
}

export async function getTaskById(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const taskId = Number(req.params.id);

    const task = await getTaskByIdService(taskId, userId);

    if (!task) {
      res.status(404).json({
        message: "Tarea no encontrada",
      });

      return;
    }

    res.status(200).json({
      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
}

export async function updateTask(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const taskId = Number(req.params.id);

    const {
      titulo,
      descripcion,
      fecha_vencimiento,
      estado,
    } = req.body;

    const task = await updateTaskService(
      taskId,
      userId,
      titulo,
      descripcion ?? null,
      fecha_vencimiento,
      estado
    );

    if (!task) {
      res.status(404).json({
        message: "Tarea no encontrada",
      });

      return;
    }

    res.status(200).json({
      message: "Tarea actualizada correctamente",
      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
}

export async function deleteTask(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const taskId = Number(req.params.id);

    const deleted = await deleteTaskService(taskId, userId);

    if (!deleted) {
      res.status(404).json({
        message: "Tarea no encontrada",
      });

      return;
    }

    res.status(200).json({
      message: "Tarea eliminada correctamente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
}
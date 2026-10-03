import { Response, NextFunction } from "express";

import {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
} from "../services/task.service.js";

import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import { AppError } from "../errors/AppError.js";

export async function createTask(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
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
    next(error);
  }
}

export async function getTasks(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.userId;

    const tasks = await getTasksService(userId);

    res.status(200).json({
      tasks,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTaskById(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const taskId = Number(req.params.id);

    const task = await getTaskByIdService(
      taskId,
      userId
    );

    if (!task) {
      throw new AppError(
        "Tarea no encontrada",
        404
      );
    }

    res.status(200).json({
      task,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTask(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const taskId = Number(req.params.id);

    if (!Number.isInteger(taskId) || taskId <= 0) {
  throw new AppError(
    "ID de tarea inválido",
    400
  );
}

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
      throw new AppError(
        "Tarea no encontrada",
        404
      );
    }

    res.status(200).json({
      message: "Tarea actualizada correctamente",
      task,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const taskId = Number(req.params.id);

    const deleted = await deleteTaskService(
      taskId,
      userId
    );

    if (!deleted) {
      throw new AppError(
        "Tarea no encontrada",
        404
      );
    }

    res.status(200).json({
      message: "Tarea eliminada correctamente",
    });
  } catch (error) {
    next(error);
  }
}
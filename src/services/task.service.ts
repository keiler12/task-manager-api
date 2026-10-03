import {
  createTask,
  findTasksByUserId,
  findTaskById,
  updateTask,
  deleteTask,
  Task,
} from "../persistence/task.repository.js";

export async function createTaskService(
  userId: number,
  titulo: string,
  descripcion: string | null,
  fechaVencimiento: string,
  estado: Task["estado"]
) {
  return createTask(
    userId,
    titulo,
    descripcion,
    fechaVencimiento,
    estado
  );
}

export async function getTasksService(userId: number) {
  return findTasksByUserId(userId);
}

export async function getTaskByIdService(
  taskId: number,
  userId: number
) {
  return findTaskById(taskId, userId);
}

export async function updateTaskService(
  taskId: number,
  userId: number,
  titulo: string,
  descripcion: string | null,
  fechaVencimiento: string,
  estado: Task["estado"]
) {
  return updateTask(
    taskId,
    userId,
    titulo,
    descripcion,
    fechaVencimiento,
    estado
  );
}

export async function deleteTaskService(
  taskId: number,
  userId: number
) {
  return deleteTask(taskId, userId);
}
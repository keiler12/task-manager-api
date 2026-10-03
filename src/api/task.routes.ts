import { Router } from "express";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { taskSchema } from "../schemas/task.schema.js";

const router = Router();

router.use(authenticateToken);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una tarea
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - fecha_vencimiento
 *               - estado
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Desarrollar API
 *               descripcion:
 *                 type: string
 *                 example: Completar endpoints
 *               fecha_vencimiento:
 *                 type: string
 *                 format: date
 *                 example: "2026-10-10"
 *               estado:
 *                 type: string
 *                 enum:
 *                   - pendiente
 *                   - en curso
 *                   - completada
 *                 example: pendiente
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: Token no válido
 */
router.post(
  "/",
  validate(taskSchema),
  createTask
);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener las tareas del usuario autenticado
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas
 *       401:
 *         description: Token no válido
 */
router.get("/", getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       401:
 *         description: Token no válido
 *       404:
 *         description: Tarea no encontrada
 */
router.get("/:id", getTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - fecha_vencimiento
 *               - estado
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Desarrollar API
 *               descripcion:
 *                 type: string
 *                 example: Actualizar documentación
 *               fecha_vencimiento:
 *                 type: string
 *                 format: date
 *                 example: "2026-10-15"
 *               estado:
 *                 type: string
 *                 enum:
 *                   - pendiente
 *                   - en curso
 *                   - completada
 *                 example: en curso
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: Token no válido
 *       404:
 *         description: Tarea no encontrada
 */
router.put(
  "/:id",
  validate(taskSchema),
  updateTask
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *       401:
 *         description: Token no válido
 *       404:
 *         description: Tarea no encontrada
 */
router.delete("/:id", deleteTask);

export default router;
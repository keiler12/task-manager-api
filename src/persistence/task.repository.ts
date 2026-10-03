import pool from "../config/database.js";

export interface Task {
  id: number;
  user_id: number;
  titulo: string;
  descripcion: string | null;
  fecha_vencimiento: Date;
  estado: "pendiente" | "en curso" | "completada";
  created_at: Date;
  updated_at: Date;
}

export async function createTask(
  userId: number,
  titulo: string,
  descripcion: string | null,
  fechaVencimiento: string,
  estado: Task["estado"]
): Promise<Task> {
  const result = await pool.query<Task>(
    `
      INSERT INTO tasks (
        user_id,
        titulo,
        descripcion,
        fecha_vencimiento,
        estado
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        user_id,
        titulo,
        descripcion,
        fecha_vencimiento,
        estado,
        created_at,
        updated_at
    `,
    [userId, titulo, descripcion, fechaVencimiento, estado]
  );

  return result.rows[0];
}

export async function findTasksByUserId(
  userId: number
): Promise<Task[]> {
  const result = await pool.query<Task>(
    `
      SELECT
        id,
        user_id,
        titulo,
        descripcion,
        fecha_vencimiento,
        estado,
        created_at,
        updated_at
      FROM tasks
      WHERE user_id = $1
      ORDER BY id DESC
    `,
    [userId]
  );

  return result.rows;
}

export async function findTaskById(
  taskId: number,
  userId: number
): Promise<Task | null> {
  const result = await pool.query<Task>(
    `
      SELECT
        id,
        user_id,
        titulo,
        descripcion,
        fecha_vencimiento,
        estado,
        created_at,
        updated_at
      FROM tasks
      WHERE id = $1
        AND user_id = $2
    `,
    [taskId, userId]
  );

  return result.rows[0] ?? null;
}

export async function updateTask(
  taskId: number,
  userId: number,
  titulo: string,
  descripcion: string | null,
  fechaVencimiento: string,
  estado: Task["estado"]
): Promise<Task | null> {
  const result = await pool.query<Task>(
    `
      UPDATE tasks
      SET
        titulo = $1,
        descripcion = $2,
        fecha_vencimiento = $3,
        estado = $4,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
        AND user_id = $6
      RETURNING
        id,
        user_id,
        titulo,
        descripcion,
        fecha_vencimiento,
        estado,
        created_at,
        updated_at
    `,
    [
      titulo,
      descripcion,
      fechaVencimiento,
      estado,
      taskId,
      userId,
    ]
  );

  return result.rows[0] ?? null;
}

export async function deleteTask(
  taskId: number,
  userId: number
): Promise<boolean> {
  const result = await pool.query(
    `
      DELETE FROM tasks
      WHERE id = $1
        AND user_id = $2
    `,
    [taskId, userId]
  );

  return result.rowCount === 1;
}
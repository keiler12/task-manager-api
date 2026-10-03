import pool from "../config/database.js";

export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query<User>(
    `
      SELECT id, name, email, password_hash, created_at
      FROM users
      WHERE email = $1
    `,
    [email]
  );

  return result.rows[0] ?? null;
}

export async function createUser(
  name: string,
  email: string,
  passwordHash: string
): Promise<User> {
  const result = await pool.query<User>(
    `
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, password_hash, created_at
    `,
    [name, email, passwordHash]
  );

  return result.rows[0];
}
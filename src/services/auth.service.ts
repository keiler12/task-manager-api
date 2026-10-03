import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  createUser,
  findUserByEmail,
} from "../persistence/user.repository.js";

import { AppError } from "../errors/AppError.js";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError(
      "El correo electrónico ya está registrado",
      409
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await createUser(
    name,
    email,
    passwordHash
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
  };
}

export async function loginUser(
  email: string,
  password: string
) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError(
      "Credenciales inválidas",
      401
    );
  }

  const passwordIsValid = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!passwordIsValid) {
    throw new AppError(
      "Credenciales inválidas",
      401
    );
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new AppError(
      "JWT_SECRET no está configurado",
      500
    );
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    jwtSecret,
    {
      expiresIn:
  (process.env.JWT_EXPIRES_IN ||
    "1h") as jwt.SignOptions["expiresIn"],
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}
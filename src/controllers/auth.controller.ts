import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
} from "../services/auth.service.js";

export async function register(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "El correo electrónico ya está registrado"
    ) {
      res.status(409).json({
        message: error.message,
      });

      return;
    }

    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
}

export async function login(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      ...result,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Credenciales inválidas"
    ) {
      res.status(401).json({
        message: error.message,
      });

      return;
    }

    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
}
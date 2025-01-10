import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expects 'Bearer TOKEN'
  
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, '^j3Zp8yK!WQ$5@dL6e') as { userId: number };
    (req as any).userId = decoded.userId; // Anexar userId à requisição
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido ou expirado" });
  }
};

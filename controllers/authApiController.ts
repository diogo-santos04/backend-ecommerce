import { Request, Response } from "express";
import { prisma } from "../src/libs/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  if (req.body.email && req.body.password) {
    let { nome, email, password, cpf } = req.body;

    let hasUser = await prisma.user.findFirst({
      where: { email },
    });
    if (!hasUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      let newUser = await prisma.user.create({
        data: {
          nome,
          email,
          cpf,
          password: hashedPassword,
        },
      });

      res.status(201);
      res.json({ id: newUser.id });
    } else {
      res.json({ error: "Email ja existe " });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    if (req.body.email && req.body.password) {
      console.log(req.body);
      let email: string = req.body.email;
      let password: string = req.body.password;

      let user = await prisma.user.findFirst({ where: { email } });

      if (user && user.password) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          res.json({ status: true });
          return;
        } else {
          res.json({ status: false });
          return;
        }
      }
    }
    res.json({ status: false });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

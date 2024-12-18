import { Router } from "express";
import usuarioRouter from "./user";
import { prisma } from "../libs/prisma"

export const mainRouter = Router();

mainRouter.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

mainRouter.use("/usuario", usuarioRouter);

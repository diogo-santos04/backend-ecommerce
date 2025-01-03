import { Router } from "express";
import usuarioRouter from "./user";
import produtoRouter from "./produto"; 
import categoriaRouter from "./categoria";

export const mainRouter = Router();

mainRouter.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

mainRouter.use("/usuario", usuarioRouter);
mainRouter.use("/produto", produtoRouter); 
mainRouter.use("/categoria", categoriaRouter);

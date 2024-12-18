import express from "express";
import { createUser, deleteUser, userList } from "../services/user";

const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({ pong: true });
});

router.post("/create", async (req, res) => {
  const { nome, cpf } = req.body;
  try {
    const user = await createUser({ nome, cpf });
    res.json(user); // Send the created user back in the response
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Erro ao criar usuário" }); 
  }
});

router.get("/dados", async (req, res) => {
  const usuarios = await userList();
  res.status(200).json(usuarios);
});

router.delete("/delete/:id", async (req, res) => {
  const id = Number(req.params.id);
  const deletedUser = await deleteUser(id);
  res.status(200).json(deletedUser);
});

export default router;

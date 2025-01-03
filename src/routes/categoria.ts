import express from "express";
import {
  createCategoria,
  deleteCategorias,
  getCategorias,
} from "../services/categoriaServices";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categorias = await getCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    console.error("Error fetching categoria:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  
});

router.post("/add", async (req, res) => {
  const { nome} = req.body;
  try {
    const produto = await createCategoria({
      nome,
    });
    res.json(produto);
  } catch (error) {
    console.error("Error creating categoria:", error);
    res.status(500).json({ message: "Erro ao criar categoria" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  console.log("hit");
  const id = Number(req.params.id);
  const deletedCategoria = await deleteCategorias(id);
  res.status(200).json(deletedCategoria);
});

export default router;

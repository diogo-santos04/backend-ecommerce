import express from "express";
import {
  createProduto,
  deleteProdutos,
  getProdutos,
} from "../services/produtosServices";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("GET /produtos hit", req.body);
    const produtos = await getProdutos();
    res.status(200).json(produtos);
  } catch (error) {
    console.error("Error fetching produtos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/add", async (req, res) => {
  console.log("POST /produtos/add hit");
  console.log(req.body);
  const { nome, descricao, preco, categoria_id } = req.body;
  const categoria = { connect: { id: categoria_id } };
  try {
    const produto = await createProduto({
      nome,
      descricao,
      preco,
      categoria,
      imagem: "",
    });
    res.json(produto);
  } catch (error) {
    console.error("Error creating produto:", error);
    res.status(500).json({ message: "Erro ao criar produto" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = Number(req.params.id);
  const deletedProduto = await deleteProdutos(id);
  res.status(200).json(deletedProduto);
});

export default router;

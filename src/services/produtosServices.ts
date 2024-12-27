import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";

export const createProduto = async (data: Prisma.ProdutoCreateInput) => {
  try {
    console.log(data);
    const produto = await prisma.produto.create({ data:{
      nome: data.nome,
      descricao: data.descricao,
      preco: data.preco,
      imagem: data.imagem,
      categoria: data.categoria,
    } });
    return produto;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getProdutos = async () => {
  try {
    return await prisma.produto.findMany();
  } catch (error) {
    console.log(error);
  }
};

export const deleteProdutos = async (id: any) => {
  try {
    const deletedProduto = await prisma.produto.delete({
      where: {
        id: id,
      },    
    });
    return deletedProduto;
  } catch (error) {
    console.log(error);
  }
};

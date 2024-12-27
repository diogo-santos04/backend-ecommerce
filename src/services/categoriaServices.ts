import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";

export const createCategoria = async (data: Prisma.CategoriaCreateInput) => {
  try {
    console.log(data);
    const categoria = await prisma.categoria.create({ data });
    return categoria;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getCategorias = async () => {
  try {
    return await prisma.categoria.findMany();
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategorias = async (id: any) => {
  try {
    const deletedCategoria = await prisma.categoria.delete({
      where: {
        id: id,
      },    
    });
    return deletedCategoria;
  } catch (error) {
    console.log(error);
  }
};

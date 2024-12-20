import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";

export const createUser = async (data: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getAllUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id: any) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },    
    });
    return deletedUser;
  } catch (error) {
    console.log(error);
  }
};

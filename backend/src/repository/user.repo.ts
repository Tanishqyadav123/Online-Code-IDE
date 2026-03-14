import prisma from "../db/config/prisma.client.js";
import { CreateNewUserType } from "../interface/user.interface.js";

export const isUserExistWithEmail = async (email: string) => {
  const userExist = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  return !!userExist;
};

export const getUserById = async (clerkId: string) => {
  return prisma.users.findUnique({
    where: {
      clerkId,
    },
  });
};
export const createNewUserRepo = async (userBody: CreateNewUserType) => {
  const newUser = await prisma.users.create({
    data: userBody,
  });

  return newUser.id;
};

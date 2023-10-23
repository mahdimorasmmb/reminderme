"use server";

import { prisma } from "@/lib/prisma";
import { createCollectionSchemaType } from "@/schema/createCollection";
import { currentUser } from "@clerk/nextjs";

export const createCollection = async (form: createCollectionSchemaType) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("user Not found");
  }

  return await prisma.collection.create({
    data: {
      userId: user.id,
      color: form.color,
      name: form.name,
    },
  });
};

export const deleteCollection = async (id: number) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  return await prisma.collection.delete({
    where: {
      id: id,
    },
  });
};

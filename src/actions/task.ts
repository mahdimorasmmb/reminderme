'use server'

import { prisma } from "@/lib/prisma";
import { createTaskeSchemaType } from "@/schema/createTaske";
import { currentUser } from "@clerk/nextjs";

export const createTask = async (data: createTaskeSchemaType) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  const { collectionId, content, expiresAt } = data;

  return await prisma.task.create({
    data: {
      userId: user.id,
      content,
      expiresAt,
      Collection: {
        connect: {
          id: collectionId,
        },
      },
    },
  });
};


export async function setTaskToDone(id: number) {
    const user = await currentUser();

    if (!user) {
        throw new Error("user not found")
    } 

    return await prisma.task.update({
        where: {
            id: id,
            userId: user.id
        },
        data: {
            done: true
        }
    })
}

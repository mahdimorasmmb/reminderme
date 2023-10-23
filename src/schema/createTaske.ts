import { z } from "zod";

export const createTaskeSchema = z.object({
    collectionId:z.number().nonnegative(),
    content:z.string().min(8,{
        message:'Taske content must be at least 8 characters'
    }),
    expiresAt:z.date().optional()
})


export type createTaskeSchemaType = z.infer<typeof createTaskeSchema>
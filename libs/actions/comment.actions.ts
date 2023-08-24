"use server";

import { PrismaClient } from "@prisma/client";

export const createComment = async (
    content: string,
    productId: string,
    authorId: string
) => {
    const prisma = new PrismaClient();
    return await prisma.comment.create({
        data: {
            content: content,
            productId: productId,
            authorId: authorId,
        },
    });
};

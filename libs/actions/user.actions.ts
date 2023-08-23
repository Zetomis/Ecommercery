"use server";

import { PrismaClient } from "@prisma/client";

export const getUser = async (userId: string) => {
    const prisma = new PrismaClient();
    return await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
};

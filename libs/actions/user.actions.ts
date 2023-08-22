"use server";

import { PrismaClient, User } from "@prisma/client";

export const getUser = async (userId: string) => {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        return new Error();
    }

    return user;
};

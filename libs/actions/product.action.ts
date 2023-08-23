"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CATEGORY, PrismaClient, Product } from "@prisma/client";
import { getServerSession } from "next-auth";

interface createProductProps {
    name: string;
    images: string[];
    price: number;
    category: CATEGORY;
    description: string;
}

export const createProduct = async (
    data: createProductProps,
    userId: string
) => {
    const prisma = new PrismaClient();

    return await prisma.product.create({
        data: {
            name: data.name,
            images: data.images,
            price: data.price,
            category: data.category,
            description: data.description,
            sellerId: userId,
        },
    });
};

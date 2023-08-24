"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MAX_PRODUCTS_PER_PAGE } from "@/constants";
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

export const getUserProducts = async (userId: string, pageNumber: number) => {
    const prisma = new PrismaClient();
    const products = await prisma.product.findMany({
        where: {
            sellerId: userId,
        },
        skip: (pageNumber - 1) * MAX_PRODUCTS_PER_PAGE,
        take: MAX_PRODUCTS_PER_PAGE,
    });
    const amount = await prisma.product.count({
        where: {
            sellerId: userId,
        },
    });
    return { products, amount };
};

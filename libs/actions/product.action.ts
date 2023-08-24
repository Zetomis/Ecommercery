"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MAX_PRODUCTS_PER_PAGE, SortMethodType } from "@/constants";
import { CATEGORY, Prisma, PrismaClient, Product } from "@prisma/client";
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

export const getUserProducts = async (
    userId: string,
    pageNumber: number,
    sortMethod: SortMethodType
) => {
    const prisma = new PrismaClient();
    const products = await prisma.product.findMany({
        where: {
            sellerId: userId,
        },
        skip: (pageNumber - 1) * MAX_PRODUCTS_PER_PAGE,
        take: MAX_PRODUCTS_PER_PAGE,
        orderBy: {
            createdAt: "desc",
        },
    });
    const amount = await prisma.product.count({
        where: {
            sellerId: userId,
        },
    });
    return { products, amount };
};

export const getProductsByCategory = async (
    category: string | null,
    pageNumber: number,
    sortMethod: SortMethodType
) => {
    const prisma = new PrismaClient();

    let currentCategory: CATEGORY | null = null;

    switch (category) {
        case "men":
            currentCategory = CATEGORY.MEN;
            break;
        case "women":
            currentCategory = CATEGORY.WOMEN;
            break;
        case "kids":
            currentCategory = CATEGORY.KIDS;
            break;
        default:
            currentCategory = null;
            break;
    }

    if (currentCategory) {
        const products = await prisma.product.findMany({
            where: {
                category: currentCategory,
            },
            skip: (pageNumber - 1) * MAX_PRODUCTS_PER_PAGE,
            take: MAX_PRODUCTS_PER_PAGE,
            orderBy: {
                createdAt: "desc",
            },
        });
        const amount = await prisma.product.count({
            where: {
                category: currentCategory,
            },
        });
        return { products, amount };
    } else {
        const products = await prisma.product.findMany({
            skip: (pageNumber - 1) * MAX_PRODUCTS_PER_PAGE,
            take: MAX_PRODUCTS_PER_PAGE,
            orderBy: {
                createdAt: "desc",
            },
        });
        const amount = await prisma.product.count();
        return { products, amount };
    }
};

export const getProduct = async (productId: string) => {
    const prisma = new PrismaClient();
    return await prisma.product.findUnique({
        where: {
            id: productId,
        },
        include: {
            comments: {
                include: {
                    author: true,
                },
            },
        },
    });
};

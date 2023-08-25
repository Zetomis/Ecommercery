"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import Button from "../previews/Button";
import Link from "next/link";
import { Session } from "next-auth";
import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "@/libs/actions/product.action";

const ProductCard = ({
    product,
    session,
    refetch,
}: {
    product: Product;
    session?: Session | null;
    refetch?: () => void;
}) => {
    const deleteProductMutation = useMutation({
        mutationKey: ["product", { id: product.id }],
        mutationFn: () => {
            return deleteProduct(product.id);
        },
        onSuccess: () => {
            if (refetch) {
                refetch();
            }
        },
    });

    return (
        <div className="w-full border border-slate-400 rounded px-3 py-4 flex flex-col gap-y-4">
            {" "}
            <Link href={`/product?id=${product.id}`}>
                <div className="w-full h-auto aspect-square rounded overflow-hidden relative">
                    <Image
                        src={product.images[0]}
                        alt="n/a"
                        fill
                        objectFit="cover"
                    />
                </div>
                <div className="grid gap-y-2">
                    <h1 className="font-semibold truncate text-slate-800 text-base block">
                        {product.name}
                    </h1>
                    <span className="block font-medium text-slate-600">
                        ${product.price}
                    </span>
                </div>
            </Link>
            <Button>Add to Cart</Button>
            {session && session.user.id === product.sellerId && (
                <Button
                    onClick={() => deleteProductMutation.mutate()}
                    isLoading={deleteProductMutation.isLoading}
                >
                    Delete
                </Button>
            )}
        </div>
    );
};

export default ProductCard;

import { Product } from "@prisma/client";
import Image from "next/image";
import Button from "../previews/Button";

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div className="w-full border border-slate-400 rounded px-3 py-4 flex flex-col gap-y-4">
            <div className="w-full h-auto aspect-square rounded overflow-hidden relative">
                <Image src={product.images[0]} alt="n/a" fill />
            </div>
            <div className="grid gap-y-2">
                <h1 className="font-semibold truncate text-slate-800 text-base block">
                    {product.name}
                </h1>
                <span className="block font-medium text-slate-600">
                    ${product.price}
                </span>
                <Button>Add to Cart</Button>
            </div>
        </div>
    );
};

export default ProductCard;

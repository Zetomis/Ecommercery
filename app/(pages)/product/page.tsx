"use client";

import Button from "@/components/previews/Button";
import Loading from "@/components/previews/Loading";
import NotFound from "@/components/previews/NotFound";
import ServerError from "@/components/previews/ServerError";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import { getProduct } from "@/libs/actions/product.action";
import ImageSlider from "@/components/previews/ImageSlider";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const ProductPage = () => {
    const params = useSearchParams();
    const id = params.get("id");

    if (!id) {
        return <NotFound />;
    }

    const productQuery = useQuery({
        queryKey: ["product", id],
        queryFn: () => {
            return getProduct(id);
        },
    });

    if (productQuery.isLoading) {
        return <Loading />;
    }

    if (productQuery.isError) {
        return <ServerError />;
    }

    if (!productQuery.data) {
        return <NotFound />;
    }

    return (
        <div className="grid lg:grid-cols-2 gap-12">
            <ImageSlider images={productQuery.data.images} />
            <div className="flex flex-col gap-y-2">
                <h1 className="font-bold text-slate-800 text-4xl mb-4">
                    {productQuery.data.name}
                </h1>
                <h2 className="font-semibold text-slate-600 text-2xl mb-2">
                    ${productQuery.data.price}
                </h2>
                <Link
                    href={`/products?category=${productQuery.data.category.toLowerCase()}`}
                    className="flex items-center gap-x-2 mb-3"
                >
                    <h1 className="button default cursor-auto">Category:</h1>
                    <span>{productQuery.data.category}</span>
                </Link>
                <Button className="mb-3">Add to Cart</Button>
                <ReactMarkdown className="prose text-slate-700">
                    {productQuery.data.description}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default ProductPage;

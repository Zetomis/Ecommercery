"use client";

import { MAX_PRODUCTS_PER_PAGE, SortMethodType } from "@/constants";
import { getProductsByCategory } from "@/libs/actions/product.action";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProductCard from "../cards/ProductCard";
import Divider from "../small/Divider";
import Button from "./Button";
import Loading from "./Loading";
import ServerError from "./ServerError";
import SortProductSelect from "./SortProductsSelect";

const ProductsDisplay = ({ category }: { category: string | null }) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [sortMethod, setSortMethod] = useState<SortMethodType>("NAME");
    const productsQuery = useQuery({
        queryKey: ["products", { category, pageNumber }],
        queryFn: () => {
            return getProductsByCategory(category, pageNumber, sortMethod);
        },
    });

    if (productsQuery.isLoading) {
        return <Loading />;
    }

    if (productsQuery.isError) {
        return <ServerError />;
    }

    if (!productsQuery.data.products || productsQuery.data.amount === 0) {
        return (
            <div>
                <h1 className="text-center text-slate-600 font-semibold text-xl">
                    There is no product
                </h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-2">
            <SortProductSelect setSortMethod={setSortMethod} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {productsQuery.data.products
                    .sort((a, b) => {
                        if (sortMethod === "NAME") {
                            return a.name > b.name ? 1 : -1;
                        } else if (sortMethod === "CREATED_AT") {
                            return a.createdAt > b.createdAt ? -1 : 1;
                        } else if (sortMethod === "PRICE_ASC") {
                            return a.price - b.price;
                        } else if (sortMethod === "PRICE_DESC") {
                            return b.price - a.price;
                        }

                        return 0;
                    })
                    .map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
            </div>
            <Divider type="horizontal" />
            <div className="flex gap-x-4">
                <Button
                    onClick={() => {
                        setPageNumber((pageNumber) => pageNumber - 1);
                    }}
                    isLoading={productsQuery.isLoading || pageNumber === 1}
                    className="w-full"
                >
                    Previous Page
                </Button>
                <Button
                    onClick={() => {
                        setPageNumber((pageNumber) => pageNumber + 1);
                    }}
                    isLoading={
                        productsQuery.isLoading ||
                        pageNumber * MAX_PRODUCTS_PER_PAGE >=
                            productsQuery.data.amount
                    }
                    className="w-full"
                >
                    Next Page
                </Button>
            </div>
        </div>
    );
};

export default ProductsDisplay;

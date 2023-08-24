"use client";

import { getUserProducts } from "@/libs/actions/product.action";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "../previews/Loading";
import ServerError from "../previews/ServerError";
import ProductCard from "../cards/ProductCard";
import Divider from "../small/Divider";
import Button from "../previews/Button";
import { MAX_PRODUCTS_PER_PAGE } from "@/constants";

const UserProductsDisplay = ({ userId }: { userId: string }) => {
    const [pageNumber, setPageNumber] = useState(1);

    const userProductsQuery = useQuery({
        queryKey: ["userProduct", userId, pageNumber],
        queryFn: () => {
            return getUserProducts(userId, pageNumber);
        },
    });

    if (userProductsQuery.isLoading) {
        return <Loading />;
    }

    if (userProductsQuery.isError) {
        return <ServerError />;
    }

    if (
        !userProductsQuery.data.products ||
        userProductsQuery.data.amount === 0
    ) {
        return (
            <div>
                <h1 className="text-center text-slate-600 font-semibold text-xl">
                    You have no product
                </h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-2">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {userProductsQuery.data.products.map((item) => (
                    <ProductCard product={item} />
                ))}
            </div>
            <Divider type="horizontal" />
            <div className="flex gap-x-4">
                <Button
                    onClick={() => {
                        setPageNumber((pageNumber) => pageNumber - 1);
                    }}
                    isLoading={userProductsQuery.isLoading || pageNumber === 1}
                    className="w-full"
                >
                    Previous Page
                </Button>
                <Button
                    onClick={() => {
                        setPageNumber((pageNumber) => pageNumber + 1);
                    }}
                    isLoading={
                        userProductsQuery.isLoading ||
                        pageNumber * MAX_PRODUCTS_PER_PAGE >=
                            userProductsQuery.data.amount
                    }
                    className="w-full"
                >
                    Next Page
                </Button>
            </div>
        </div>
    );
};

export default UserProductsDisplay;

"use client";

import Loading from "@/components/previews/Loading";
import ProductsDisplay from "@/components/previews/ProductsDisplay";
import ServerError from "@/components/previews/ServerError";
import { getProductsByCategory } from "@/libs/actions/product.action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const ProductsPage = () => {
    const searchParams = useSearchParams();
    const category = searchParams.get("category");

    return <ProductsDisplay category={category} />;
};

export default ProductsPage;

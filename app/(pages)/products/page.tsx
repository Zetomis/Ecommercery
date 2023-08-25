"use client";

import ProductsDisplay from "@/components/previews/ProductsDisplay";
import { useSearchParams } from "next/navigation";

const ProductsPage = () => {
    const searchParams = useSearchParams();
    const category = searchParams.get("category");

    return <ProductsDisplay category={category} />;
};

export default ProductsPage;

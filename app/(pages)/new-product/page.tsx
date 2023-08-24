"use client";

import Button from "@/components/previews/Button";
import { createProduct } from "@/libs/actions/product.action";
import { useUploadThing } from "@/libs/utils/uploadthing";
import { CATEGORY, Product } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";

let imageURLs: string[] = [];

const NewProductPage = () => {
    const { data: session, status } = useSession();
    const [name, setName] = useState("");
    const [images, setImages] = useState<File[]>([]);
    // const [imageURLs, setImageURLs] = useState<string[]>([]);
    // If it works, it works
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState<CATEGORY>(CATEGORY.MEN);
    const [description, setDescription] = useState("");

    const productMutation = useMutation<Product>({
        mutationKey: ["createdProduct"],
        mutationFn: () => {
            return createProduct(
                { name, images: imageURLs, price, category, description },
                session?.user.id ?? ""
            );
        },
    });
    const { startUpload, isUploading } = useUploadThing("imagesUploader", {
        onClientUploadComplete: async (files) => {
            const newImageURLs = files?.map((f) => f.url);
            if (newImageURLs) {
                imageURLs = newImageURLs;
                // setImageURLs(newImageURLs);
            }
            console.log("aa");
            productMutation.mutate();
        },
        onUploadError: (error: any) => {
            console.log(error);
        },
    });

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "unauthenticated") {
        return (
            <div>
                <h1 className="text-center text-4xl font-extrabold">
                    Sign In to continue
                </h1>
            </div>
        );
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (images && images.length > 10) {
            alert("Max images count is 10");
            setImages([]);
            return;
        }
        if (images.length === 0) {
            alert("Require Image");
            return;
        }
        await startUpload(images);
    };

    return (
        <form
            className="flex flex-col gap-y-2"
            onSubmit={(event) => handleSubmit(event)}
        >
            <h1 className="font-extrabold text-4xl mb-6 text-center">
                Create new Product
            </h1>

            <label htmlFor="name" className="label">
                Name
            </label>
            <input
                type="text"
                id="name"
                placeholder="Name..."
                className="input mb-2"
                onChange={(event) => setName(event.target.value)}
                required
            />

            <label htmlFor="images" className="label">
                Images
            </label>
            <label htmlFor="images" className="button ghost">
                Add Images ({images.length} files chosen)
            </label>
            <input
                type="file"
                id="images"
                multiple
                className="hidden"
                onChange={(event) => {
                    const newImages: File[] = [];
                    if (event.target && event.target.files) {
                        for (let i = 0; i < event.target.files.length; i++) {
                            newImages.push(event.target.files[i]);
                        }
                    }
                    setImages(newImages);
                }}
            ></input>

            <label htmlFor="price" className="label">
                Price
            </label>
            <input
                type="number"
                id="price"
                placeholder="Price..."
                className="input mb-2"
                onChange={(event) => setPrice(Number(event.target.value))}
                required
            />

            <label htmlFor="category" className="label">
                Category
            </label>
            <select
                name="category"
                id="category"
                className="select cursor-pointer"
                onChange={(event) => {
                    setCategory(event.target.value as CATEGORY);
                }}
                required
            >
                <option value={CATEGORY.MEN} selected>
                    Men
                </option>
                <option value={CATEGORY.WOMEN}>Women</option>
                <option value={CATEGORY.KIDS}>Kids</option>
            </select>

            <label htmlFor="description" className="label">
                Description
            </label>
            <textarea
                className="textarea h-64"
                placeholder="Enter Markdown text..."
                onChange={(event) => setDescription(event.target.value)}
                required
            ></textarea>

            <Button
                className="mt-6"
                isLoading={productMutation.isLoading || isUploading}
            >
                Add
            </Button>
        </form>
    );
};

export default NewProductPage;

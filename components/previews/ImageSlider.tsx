"use client";

import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import Button from "./Button";
import Image from "next/image";

const ImageSlider = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className="flex flex-col gap-y-2">
            <Button
                className="w-full flex justify-center"
                onClick={() =>
                    setCurrentIndex((currentIndex) => currentIndex - 1)
                }
                isLoading={currentIndex <= 0}
            >
                <FaChevronUp />
            </Button>
            <div className="w-full aspect-square relative rounded overflow-hidden">
                <Image
                    src={images[currentIndex]}
                    alt=""
                    fill
                    objectFit="cover"
                />
            </div>
            <Button
                className="w-full flex justify-center"
                onClick={() =>
                    setCurrentIndex((currentIndex) => currentIndex + 1)
                }
                isLoading={currentIndex + 1 >= images.length}
            >
                <FaChevronDown />
            </Button>
        </div>
    );
};

export default ImageSlider;

"use client";

import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface IProductHeaderProps {
    products: Pick<Product, "name" | "imageUrl">
}

const ProductHeader = ({ products }: IProductHeaderProps) => {
    const router = useRouter();
    const handleBackClick = () => router.back();
    return (
        <div className="relative h-[300px] w-full">
            <Button
                variant="secondary"
                className="absolute left-4 top-4 z-50 rounded-full"
                size="icon"
                onClick={handleBackClick}
            >
                <ChevronLeftIcon />
            </Button>

            <Image src={products.imageUrl} alt={products.name} fill className="object-contain"/>

            <Button
                variant="secondary"
                className="absolute right-4 top-4 z-50 rounded-full"
                size="icon"
            >
            </Button>
        </div>
     );
}

export default ProductHeader;
"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

import CartSheet from "../../components/cart-sheet";
import { CartContext } from "../../contexts/cart";

interface IProductDetailsProps {
    products: Prisma.ProductGetPayload<{ include: { restaurant: { select: { name: true, avatarImageUrl: true } } } }>
}

const ProductDetails = ({ products }: IProductDetailsProps) => {
    const {toggleCart} = useContext(CartContext)
    const [quantity, setQuantity] = useState<number>(1);

    const handleDecreaseQuantity = () => setQuantity((prev) => prev === 1 ? 1 : prev - 1);
    const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
    const handleAddToCart = () => {
        toggleCart()
    }

    if (!products) return notFound();

    return (
        <>
            <div className="relative z-50 rounded-t-3xl py-5 mt-[-1.5rem] p-5 flex flex-col flex-auto overflow-hidden">
                <div className="flex-auto overflow-hidden">
                    {/* RESTAURANTE */}
                    <div className="flex items-center gap-1.5">
                        <Image src={products.restaurant.avatarImageUrl} alt={products.restaurant.name} width={16} height={16} className="rounded-full" />
                        <p className="text-xs text-muted-foreground">{products.restaurant.name}</p>
                    </div>

                    {/* NOME DO PRODUTO */}
                    <h2 className="text-xl font-semibold mt-1">{products.name}</h2>

                    {/* PREÇO E QUANTIDADE */}
                    <div className="flex items-center justify-between mt-3">
                        <h3 className="text-xl font-semibolds">
                            {formatCurrency(products.price)}
                        </h3>
                        <div className="flex items-center gap-3 text-center">
                            <Button variant="outline" className="h-8 w-8 rounded-xl" onClick={handleDecreaseQuantity}>
                                <ChevronLeftIcon />
                            </Button>
                            <p className="w-4">{quantity}</p>
                            <Button variant="destructive" className="h-8 w-8 rounded-xl" onClick={handleIncreaseQuantity}>
                                <ChevronRightIcon />
                            </Button>
                        </div>
                    </div>

                    <ScrollArea className="h-full">
                        {/* SOBRE */}
                        <div className="mt-6 SPACE-Y-3">
                            <h4 className="font-semibold">Sobre</h4>
                            <p className="text-sm text-muted-foreground">{products.description}</p>
                        </div>

                        {/* INGREDIENTES */}
                        <div className="mt-6 space-y-3">
                            <div className="flex itmes-center gap-1">
                                <ChefHatIcon />
                                <h4 className="font-semibold">Sobre</h4>
                            </div>
                            <ul className="list-disc text-sm text-muted-foreground ml-5">
                                {products.ingredients.map((ingredient) => (
                                    <li key={ingredient}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    </ScrollArea>
                </div>
            <Button className="w-full rounded-full" onClick={handleAddToCart}>Adiconoar à sacola</Button>
            </div>
            <CartSheet />
        </>
    );
}

export default ProductDetails;
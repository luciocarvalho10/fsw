import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { ICartProduct } from "../../contexts/cart";

interface ICartProductItemProps {
    product: ICartProduct
}

const CartProductItem = ({ product }: ICartProductItemProps) => {

    function handleDecreaseQuantity(): void {

    }
    function handleIncreaseQuantity(): void {

    }

    return (
        <div className="flex items-center justify-between">
            {/*ESQUERDA */}
            <div className="flex items-center gap-3">
                <div className="relative h-20 w-20 rounded-xl bg-gray-100">
                    <Image src={product.imageUrl} alt={product.name} fill />
                </div>
                <div className="space-y-1">
                    <p className="text-xs max-w-[90%] truncate">{product.name}</p>
                    <p className="text-ms font-semibold">{formatCurrency(product.price)}</p>

                    {/* QUANTIDADE */}
                    <div className="flex items-center gap-1 text-center">
                        <Button variant="outline" className="h-7 w-7 rounded-lg" onClick={handleDecreaseQuantity}>
                            <ChevronLeftIcon />
                        </Button>
                        <p className="w-7 text-xs">{product.quantity}</p>
                        <Button variant="destructive" className="h-7 w-7 rounded-lg" onClick={handleIncreaseQuantity}>
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </div>
            </div>

            {/* DIREITA */}
            <Button variant="outline" className="h-7 w-7 rounded-lg" onClick={handleDecreaseQuantity}>
                <TrashIcon />
            </Button>
        </div>
    );
}

export default CartProductItem;
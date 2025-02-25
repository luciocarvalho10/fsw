import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext, ICartProduct } from "../../contexts/cart";

interface ICartProductItemProps {
    product: ICartProduct;
}

const CartProductItem = ({ product }: ICartProductItemProps) => {
    const { decresaseProductQuantity, increaseProductQuantity, removeProduct } = useContext(CartContext);

    function handleDecreaseQuantity(): void {
        decresaseProductQuantity(product.id);
    }

    function handleIncreaseQuantity(): void {
        increaseProductQuantity(product.id);
    }

    function handleRemoveProduct(): void {
        removeProduct(product.id);
    }

    return (
        <div className="flex items-center justify-between">
            {/*ESQUERDA */}
            <div className="flex items-center gap-3">
                <div className="relative h-20 w-20 rounded-xl bg-gray-100">
                    <Image src={product.imageUrl} alt={product.name} fill />
                </div>
                <div className="space-y-1">
                    <p className="max-w-[90%] truncate text-xs">{product.name}</p>
                    <p className="text-ms font-semibold">
                        {formatCurrency(product.price)}
                    </p>

                    {/* QUANTIDADE */}
                    <div className="flex items-center gap-1 text-center">
                        <Button
                            variant="outline"
                            className="h-7 w-7 rounded-lg"
                            onClick={handleDecreaseQuantity}
                        >
                            <ChevronLeftIcon />
                        </Button>
                        <p className="w-7 text-xs">{product.quantity}</p>
                        <Button
                            variant="destructive"
                            className="h-7 w-7 rounded-lg"
                            onClick={handleIncreaseQuantity}
                        >
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </div>
            </div>

            {/* DELETAR */}
            <Button
                variant="outline"
                className="h-7 w-7 rounded-lg"
                onClick={handleRemoveProduct}
            >
                <TrashIcon />
            </Button>
        </div>
    );
};

export default CartProductItem;

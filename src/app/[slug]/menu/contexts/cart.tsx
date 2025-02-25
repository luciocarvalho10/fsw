"use client";

import { Product } from "@prisma/client";
import { createContext, useState } from "react";

export interface ICartProduct
    extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
    quantity: number;
}
export interface ICartContext {
    isOpen: boolean;
    products: ICartProduct[];
    toggleCart: () => void;
    addProduct: (product: ICartProduct) => void;
    decresaseProductQuantity: (productId: ICartProduct["id"]) => void;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => { },
    addProduct: () => { },
    decresaseProductQuantity: () => { },
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<ICartProduct[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => setIsOpen(!isOpen);

    const addProduct = (product: ICartProduct) => {
        const productIsAlreadyOnTheCart = products.some(
            (prevProduct) => product.id === prevProduct.id,
        );
        if (!productIsAlreadyOnTheCart)
            return setProducts((prevProducts) => [...prevProducts, product]);

        setProducts((prevProducts) =>
            prevProducts.map((prevProduct) => {
                if (prevProduct.id === product.id) {
                    return {
                        ...prevProduct,
                        quantity: prevProduct.quantity + product.quantity,
                    };
                }

                return prevProduct;
            }),
        );
    };

    const decresaseProductQuantity = (productId: string) => {
        setProducts((prevProducts) =>
            prevProducts.map((prevProduct) => {
                if (prevProduct.id !== productId){
                    return prevProduct;
                }
                if (prevProduct.quantity === 1) {
                    return prevProduct;
                }
                return {
                    ...prevProduct,
                    quantity: prevProduct.quantity - 1,
                };
            }),
        );
    };

    return (
        <CartContext.Provider
            value={{
                isOpen,
                products,
                toggleCart,
                addProduct,
                decresaseProductQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

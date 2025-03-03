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
    increaseProductQuantity: (productId: ICartProduct["id"]) => void;
    removeProduct: (productId: ICartProduct["id"]) => void;
    total: number;
    totalQuantity: number;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => { },
    addProduct: () => { },
    decresaseProductQuantity: () => { },
    increaseProductQuantity: () => { },
    removeProduct: () => { },
    total: 0,
    totalQuantity: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<ICartProduct[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
    const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);

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

    const increaseProductQuantity = (productId: string) => {
        setProducts((prevProducts) =>
            prevProducts.map((prevProduct) => {
                if (prevProduct.id !== productId){
                    return prevProduct;
                }
                return {
                    ...prevProduct,
                    quantity: prevProduct.quantity + 1,
                };
            }),
        );
    };

    const removeProduct = (productId: string) => {
        setProducts((prevProducts) =>
            prevProducts.filter((prevProduct) => prevProduct.id !== productId),
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
                increaseProductQuantity,
                removeProduct,
                total,
                totalQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

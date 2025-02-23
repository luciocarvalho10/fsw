"use client"

import { Product } from "@prisma/client"
import { createContext, useState } from "react"

interface ICartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
    quantity: number
}
export interface ICartContext {
    isOpen: boolean
    products: ICartProduct[]
    toggleCart: () => void
    addProduct: (product: ICartProduct) => void
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => {},
    addProduct: () => {},
})

export const CartProvider  = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<ICartProduct[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => setIsOpen(!isOpen);
    const addProduct = (product: ICartProduct) => {
        setProducts((prev) => [...prev, product]);
    }

    return (
        <CartContext.Provider value={{
            isOpen,
            products,
            toggleCart,
            addProduct
        }}>
            {children}
        </CartContext.Provider>
    )
}
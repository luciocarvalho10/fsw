"use client"

import { Product } from "@prisma/client"
import { createContext, useState } from "react"

interface ICartProduct extends Product {
    quantity: number
}
export interface ICartContext {
    isOpen: boolean
    products: ICartProduct[]
    toggleCart: () => void
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => {}
})

export const CartProvider  = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<ICartProduct[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => setIsOpen(!isOpen);

    return (
        <CartContext.Provider value={{
            isOpen,
            products,
            toggleCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}
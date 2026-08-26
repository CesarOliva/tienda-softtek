import { createContext } from "react";

export type CartProduct = {
    product_id: number;
    nombre: string;
    imagen?: string;
    precio: number;
    stock: number;
};

export type CartItem = CartProduct & {
    quantity: number;
};

export type CartContextValue = {
    items: CartItem[];
    addItem: (product: CartProduct) => void;
    removeItem: (productId: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
};

export const CartContext = createContext<CartContextValue | null>(null);
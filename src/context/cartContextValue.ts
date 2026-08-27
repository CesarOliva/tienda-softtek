import { createContext } from "react";
import type { CartProduct } from "../types/CartProduct";

export type CartItem = CartProduct & {
    quantity: number;
};

export type CartContextValue = {
    items: CartItem[];
    addItem: (product: CartProduct) => void;
    removeItem: (productId: number) => void;
    clearCart: () => void;
    refreshStock: () => Promise<boolean>;
    cartCount: number;
    cartTotal: number;
};

export const CartContext = createContext<CartContextValue | null>(null);
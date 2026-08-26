import { useMemo, useState, useEffect } from "react";
import { CartContext } from "./cartContextValue";

export function CartProvider({ children }) {
	const [items, setItems] = useState(() => {
		const savedCart = localStorage.getItem("cart");
		return savedCart ? JSON.parse(savedCart) : [];
	});

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(items));
	}, [items]);

	const addItem = (product) => {
		setItems((currentItems) => {
			const existingItem = currentItems.find((item) => item.product_id === product.product_id);

			if (existingItem) {
				return currentItems.map((item) => item.product_id === product.product_id
					? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
					: item
				);
			}

			return [...currentItems, { ...product, quantity: 1 }];
		});
	};

	const removeItem = (productId) => {
		setItems((currentItems) => currentItems
			.map((item) => item.product_id === productId ? { ...item, quantity: item.quantity - 1 } : item)
			.filter((item) => item.quantity > 0)
		);
	};

	const clearCart = () => {
		setItems([]);
	};

	const cartCount = items.reduce((total, item) => total + item.quantity, 0);
	const cartTotal = items.reduce((total, item) => total + Number(item.precio) * item.quantity, 0);

	const value = useMemo(() => ({ items, addItem, removeItem, clearCart, cartCount, cartTotal }), [items, cartCount, cartTotal]);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}


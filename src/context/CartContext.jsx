import { useMemo, useState, useEffect } from "react";
import { CartContext } from "./cartContextValue";
import { supabase } from "../lib/supabaseClient";

export function CartProvider({ children }) {
	const [items, setItems] = useState(() => {
		const savedCart = localStorage.getItem("cart");
		return savedCart ? JSON.parse(savedCart) : [];
	});

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(items));
	}, [items]);

	const addItem = (product) => {
		if (product.stock <= 0) {
			return;
		}

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

	const refreshStock = async () => {
		if (items.length === 0) {
			return true;
		}

		const productIds = items.map((item) => item.product_id);
		const { data, error } = await supabase
			.from("products")
			.select("product_id, stock")
			.in("product_id", productIds);

		if (error) {
			console.error("Error checking product stock:", error);
			return false;
		}

		const stockByProductId = new Map(
			(data ?? []).map((product) => [product.product_id, product.stock])
		);
		const updatedItems = items.map((item) => ({
			...item,
			stock: stockByProductId.get(item.product_id) ?? 0,
		}));

		setItems(updatedItems);
		return updatedItems.every((item) => item.stock > 0 && item.quantity <= item.stock);
	};

	const cartCount = items.reduce((total, item) => total + item.quantity, 0);
	const cartTotal = items.reduce((total, item) => total + Number(item.precio) * item.quantity, 0);

	const value = useMemo(() => ({ items, addItem, removeItem, clearCart, refreshStock, cartCount, cartTotal }), [items, cartCount, cartTotal]);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}


import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../_components/ProductCard";
import { supabase } from "../lib/supabaseClient";
import { addProductImage } from "../lib/productImages";
import type { Product } from "../../types/Product";
import type { Category } from "../../types/Category";

const Catalogo = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    useEffect(() => {
        const categorySlug = searchParams.get("categoria");
        if (!categorySlug || categories.length === 0) return;

        const normalize = (value: string) =>
            value
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();
        const normalizedSlug = normalize(categorySlug);
        const category = categories.find((item) => {
            const categoryName = normalize(item.nombre);
            return (
                categoryName === normalizedSlug ||
                categoryName.includes(normalizedSlug) ||
                normalizedSlug.includes(categoryName)
            );
        });

        setSelectedCategory(category?.category_id ?? null);
    }, [categories, searchParams]);

    async function getProducts() {
        const { data, error } = await supabase
            .from("products")
            .select("*, images (ruta)");

        if (error) {
            console.error("Error fetching products:", error);
            return;
        }

        setProducts((data ?? []).map(addProductImage));
    }

    async function getCategories() {
        const { data, error } = await supabase
            .from("categories")
            .select("category_id, nombre")
            .order("nombre");

        if (error) {
            console.error("Error fetching categories:", error);
            return;
        }

        setCategories(data ?? []);
    }

    const filteredProducts =
        selectedCategory === null
            ? products
            : products.filter(
                  (product) => product.category_id === selectedCategory
              );

    return (
        <>
            <section
                className="relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url("https://economipedia.com/wp-content/uploads/Tecnolog%C3%ADa-de-producto.jpg")` }}
            >
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 max-w-2xl px-6 text-center text-white">
                    <h2 className="catalogo mb-4 text-4xl font-bold md:text-5xl">Catálogo de productos</h2>
                    <p className="text-lg text-neutral-200 md:text-xl">Conoce los mejores productos de las mejores marcas. Solo en TechZone</p>
                </div>
            </section>

            <main className="w-full flex flex-col md:flex-row mx-auto my-12 max-w-7xl gap-8 px-8">
                <aside className="w-full md:w-64 shrink-0">
                    <div className="sticky top-28 rounded-xl border border-neutral-800 bg-neutral-900 p-5 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold">Categorías</h3>

                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`rounded-lg px-3 py-2 text-left transition cursor-pointer ${
                                    selectedCategory === null
                                        ? "bg-white text-black"
                                        : "hover:bg-neutral-100 hover:text-black"
                                }`}
                            >
                                Todos
                            </button>

                            {categories.map((category) => (
                                <button
                                    key={category.category_id}
                                    onClick={() =>
                                        setSelectedCategory(
                                            category.category_id
                                        )
                                    }
                                    className={`rounded-lg px-3 py-2 text-left transition cursor-pointer ${
                                        selectedCategory ===
                                        category.category_id
                                            ? "bg-white text-black"
                                            : "hover:bg-neutral-100 hover:text-black"
                                    }`}
                                >
                                    {category.nombre}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                <section className="flex-1">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Productos</h2>

                        <span className="text-md text-neutral-500">{filteredProducts.length} productos</span>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="Product">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.product_id}
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-60 items-center justify-center rounded-xl border border-dashed border-neutral-300">
                            <p className="text-neutral-500">
                                No hay productos en esta categoría.
                            </p>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};

export default Catalogo;
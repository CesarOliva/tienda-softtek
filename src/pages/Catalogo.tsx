import { useEffect, useState } from "react";
import ProductCard from "../_components/ProductCard";
import { supabase } from "../lib/supabaseClient";
import type { Product } from "../../types/Product";

const Catalogo = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts();
    }, [])

    async function getProducts(){
        const { data, error } = await supabase.from('products').select();

        if(error) {
            console.error('Error fetching products:', error);
            return
        }

        setProducts(data);
    }

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
            <main className="mx-auto flex min-h-screen max-w-4xl flex-col px-8 justify-center my-12">
                <div className='Product'>
                    {products.map((product: Product) => (
                        <ProductCard key={product.product_id} product={product} />
                    ))}
                </div>
            </main>
        </>
    );
}

export default Catalogo;
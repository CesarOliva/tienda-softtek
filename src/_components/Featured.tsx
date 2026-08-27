import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "./GridCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { supabase } from "../lib/supabaseClient";
import { addProductImage } from "../lib/productImages";

const Featured = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts();
    }, [])

    async function getProducts(){
        const { data, error } = await supabase
            .from('products')
            .select("*, images (ruta)")
            .order("product_id")
            .limit(4);

        if(error) {
            console.error('Error fetching products:', error);
            return
        }

        setProducts((data ?? []).map(addProductImage));
    }

    return (
        <div className="">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl">Productos destacados</h2>
                <Link to="/catalogo" className="text-neutral-300 flex items-center cursor-pointer gap-2">Ver todos <ArrowRight className="size-5" /></Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 mt-6">
                {products.slice(0, 4).map((product: Product) => (
                    <Card
                        key={product.product_id} 
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
}
 
export default Featured;
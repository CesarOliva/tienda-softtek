import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "./GridCard";
import { useEffect, useState } from "react";
import type { Product } from "../../types/Product";
import { supabase } from "../lib/supabaseClient";

const Featured = () => {
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
        <div className="">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl">Productos destacados</h2>
                <Link to="/catalogo" className="text-neutral-300 flex items-center cursor-pointer gap-2">Ver todos <ArrowRight className="size-5" /></Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 mt-6">
                {products.slice(0, 4).map((product: Product) => (
                    <Card
                        key={product.product_id} 
                        id={product.product_id}
                        imagen={"product.imagen"}
                        nombre={product.nombre}
                        precio={product.precio}
                    />
                ))}
            </div>
        </div>
    );
}
 
export default Featured;
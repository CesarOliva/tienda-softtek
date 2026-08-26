import { Link, useParams } from "react-router-dom";
import ReactConfetti from "react-confetti";
import { useEffect, useState } from "react";
import Featured from "../_components/Featured";
import Reviews from "../_components/reviews";
import { supabase } from "../lib/supabaseClient";
import type { Product } from "../../types/Product";
import { ShoppingCart } from "lucide-react";
import { RatingStars, useProductRating } from "../lib/reviews";
import { useCart } from "../context/useCart";

function Producto() {
    const { productId } = useParams();

    const [prefix, value] = productId?.split("-") ?? [];
    const id = prefix === "producto" && /^\d+$/.test(value) 
        ? Number(value)
        : null;

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false);

    const productRating = useProductRating(id);
    const { addItem } = useCart();

    useEffect(() => {
        async function getProduct() {
            if (id === null) {
                setIsLoading(false);
                return;
            }

            const { data, error } = await supabase.from("products").select().eq("product_id", id).maybeSingle();
            if (error) console.error("Error fetching product:", error);
            setProduct(data ?? null);
            setIsLoading(false);
        }
        getProduct();
    }, [id]);    
    
    const handleComprar = () => {
        setShowConfetti(true);
        
        setTimeout(() => {
            setShowConfetti(false);
        }, 5000);
    };
    
    if (isLoading) {
        return <main className="mx-auto flex h-screen max-w-5xl items-center justify-center px-8">Cargando producto...</main>;
    }

    if (!product) {
        return (
            <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-8 justify-center">
                <h2 className="text-5xl font-semibold mb-4 text-center">
                    Producto no encontrado
                </h2>

                <p className="text-lg font-light mb-8 text-center">
                    El producto que buscaste no fue encontrado.
                </p>

                <section className="flex justify-center">
                    <Link
                        to="/"
                        className="group flex items-center max-w-80 justify-center text-center text-lg gap-2 cursor-pointer bg-neutral-900 hover:bg-neutral-800 py-2 px-6 rounded-lg"
                    >
                        Volver a Inicio
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="mx-auto flex md:min-h-screen max-w-5xl flex-col gap-8 px-8 md:justify-center mt-12 md:mb-24">

            {showConfetti && (
                <ReactConfetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={500}
                />
            )}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 pb-8">
                <img
                    loading="lazy"
                    src={product.imagen}
                    alt={product.nombre}
                    className="rounded-2xl bg-neutral-900 block w-full object-contain transition-all duration-300"
                />

                <section className="flex flex-col justify-center">
                    <span className="text-xs uppercase tracking-[0.35em] text-neutral-400 mb-4 block">
                        Detalles del producto
                    </span>

                    <h1 className="text-5xl font-semibold mb-4">
                        {product.nombre}
                    </h1>

                    <div className="flex items-center gap-2 mb-3">
                        <RatingStars rating={productRating.rating} className="text-sm" />
                        <span className="text-xs text-neutral-500">{productRating.count > 0 ? `${productRating.rating}/5 (${productRating.count})` : "Sin opiniones"}</span>
                    </div>

                    <p className="text-3xl font-light mb-2">
                        ${product.precio}
                    </p>

                    <p className="text-lg font-light mb-2">
                        {product.descripcion}
                    </p>

                    <div className="flex flex-col md:flex-row w-full items-center gap-2">
                        <button
                            type="button"
                            disabled={product.stock == 0}
                            onClick={handleComprar}
                            className="w-full md:w-1/2 disabled:cursor-not-allowed cursor-pointer text-lg gap-2 disabled:bg-neutral-800 bg-neutral-900 hover:bg-neutral-800 py-2 px-6 rounded-lg"
                        >
                            {product.stock == 0 ? "No disponible" : "Comprar"}
                        </button>

                        {product.stock > 0 && (
                            <button
                                type="button"
                                onClick={() => addItem(product)}
                                className="flex items-center w-full md:w-1/2 cursor-pointer text-lg gap-2 bg-neutral-200 hover:bg-neutral-300 py-2 px-6 rounded-lg text-black justify-center"
                            >
                                <ShoppingCart className="size-5 mr-2" />
                                Agregar al carrito
                            </button>
                        )}
                    </div>
                </section>
            </div>
        
            {id !== null && <Reviews productId={id} />}
            <Featured/>
        </main>
    );
}

export default Producto;

import { Link, useNavigate, useParams } from "react-router-dom";
import ReactConfetti from "react-confetti";
import { useEffect, useState } from "react";
import Featured from "../_components/Featured";
import Reviews from "../_components/Producto/reviews";
import { supabase } from "../lib/supabaseClient";
import type { Product } from "../types/Product";
import { ShoppingCart } from "lucide-react";
import { RatingStars, useProductRating } from "../lib/reviews";
import { addProductImage } from "../lib/productImages";
import { useCart } from "../context/useCart";

function Producto() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [prefix, value] = productId?.split("-") ?? [];
    const id = prefix === "producto" && /^\d+$/.test(value) 
        ? Number(value)
        : null;

    const [product, setProduct] = useState<Product | null>(null);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [currentImage, setCurrentImage] = useState(0);
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

            const { data, error } = await supabase
                .from("products")
                .select()
                .eq("product_id", id)
                .maybeSingle();

            if (error) {
                console.error("Error fetching product:", error);
            }

            if (!data) {
                setProduct(null);
                setImageUrls([]);
                setIsLoading(false);
                return;
            }

            const { data: images, error: imagesError } = await supabase
                .from("images")
                .select("ruta")
                .eq("product_id", id);

            if (imagesError) {
                console.error("Error fetching product images:", imagesError);
            }

            const urls = (images ?? [])
                .map((image) => image.ruta)
                .filter(Boolean);

            setImageUrls(urls);
            setCurrentImage(0);
            setProduct(addProductImage({ ...data, images: images ?? [] }));
            setIsLoading(false);
        }

        getProduct();
    }, [id]);

    const handleComprar = () => {
        setShowConfetti(true);

        navigate("/checkout", {
            state: {
                product: {
                    product_id: product?.product_id
                }
            }
        });
    };
    
    if (isLoading) {
        return (
            <main className="mx-auto flex md:min-h-screen max-w-5xl flex-col gap-8 px-8 md:justify-center mt-12 md:mb-24 animate-pulse" aria-busy="true" aria-label="Cargando producto">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 pb-8">
                    <div className="w-full aspect-square rounded-2xl bg-neutral-800" />

                    <section className="flex flex-col justify-center">
                        <div className="mb-4 h-3 w-36 rounded bg-neutral-800" />
                        <div className="mb-4 h-12 w-4/5 rounded bg-neutral-800" />
                        <div className="mb-3 h-4 w-28 rounded bg-neutral-800" />
                        <div className="mb-3 h-8 w-32 rounded bg-neutral-800" />
                        <div className="mb-2 h-5 w-full rounded bg-neutral-800" />
                        <div className="mb-6 h-5 w-3/4 rounded bg-neutral-800" />

                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="h-11 w-full rounded-lg bg-neutral-800" />
                            <div className="h-11 w-full rounded-lg bg-neutral-800" />
                        </div>
                    </section>
                </div>
            </main>
        );
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
        <main className="mx-auto flex md:min-h-screen max-w-5xl flex-col gap-8 px-8 md:justify-center mt-12 mb-8 md:mb-24">

            {showConfetti && (
                <ReactConfetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={500}
                />
            )}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 pb-8">
                <div className="flex flex-col gap-3">
                    <div className="relative flex aspect-square items-center justify-center rounded-2xl bg-neutral-900">
                        {imageUrls.length > 0 && (
                            <img
                                loading="lazy"
                                src={imageUrls[currentImage]}
                                alt={`${product.nombre} ${currentImage + 1}`}
                                className="block w-full aspect-square rounded-2xl object-contain transition-all duration-300"
                            />
                        )}

                        {imageUrls.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setCurrentImage((currentImage - 1 + imageUrls.length) % imageUrls.length)}
                                    aria-label="Imagen anterior"
                                    className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-xl hover:bg-black/80"
                                >
                                    &#10094;
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCurrentImage((currentImage + 1) % imageUrls.length)}
                                    aria-label="Siguiente imagen"
                                    className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-xl hover:bg-black/80"
                                >
                                    &#10095;
                                </button>
                            </>
                        )}
                    </div>

                    {imageUrls.length > 1 && (
                        <div className="flex justify-center gap-2">
                            {imageUrls.map((imageUrl, index) => (
                                <button
                                    type="button"
                                    key={imageUrl}
                                    onClick={() => setCurrentImage(index)}
                                    aria-label={`Ver imagen ${index + 1}`}
                                    className={`size-2 rounded-full ${index === currentImage ? "bg-white" : "bg-neutral-600"}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <section className="flex flex-col justify-center">
                    <span className="text-xs uppercase tracking-[0.35em] text-neutral-400 mb-4 block">
                        Detalles del producto
                    </span>

                    <h1 className="text-5xl font-semibold mb-4">
                        {product.nombre}
                    </h1>

                    <div className="flex items-center gap-2 mb-3">
                        <RatingStars rating={productRating.rating} className="text-lg" />
                        <span className="text-sm text-neutral-500">{productRating.count > 0 ? `${productRating.rating}/5 (${productRating.count})` : "Sin opiniones"}</span>
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
                                onClick={() => addItem({
                                    product_id: product.product_id,
                                    nombre: product.nombre,
                                    imagen: product.imagen ?? "",
                                    precio: product.precio,
                                    stock: product.stock,
                                })}
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

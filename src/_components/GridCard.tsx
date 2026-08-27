import { Link } from "react-router-dom";
import { RatingStars, useProductRating } from "../lib/reviews";
import { Product } from "../types/Product";
import { useCart } from "@/context/useCart";
import { ShoppingCart } from "lucide-react";

const Card = (
    { product } : { product: Product }
) => {
    const productRating = useProductRating(product.product_id);
    const { addItem } = useCart();
    return (
        <Link to={`/producto-${product.product_id}`} className="block w-full min-w-0 rounded-xl bg-neutral-900 cursor-pointer transition-colors duration-300">
            <img loading="lazy" className="w-full object-cover rounded-t-xl h-48" src={product.imagen ?? ""} alt={product.nombre} />

            <div className="flex min-w-0 gap-1 p-4">
                <div className="min-w-0 flex-1">
                    <h3 className="mb-1 truncate font-medium text-[18px]">{product.nombre}</h3>
                    <p className="mb-1 text-md text-neutral-400 font-semibold">${product.precio}</p>
                    <div className="flex items-center gap-1">
                        <RatingStars rating={productRating.rating} className="text-xs" />
                        <span className="text-[10px] text-neutral-500">({productRating.count})</span>
                    </div>
                    <button
                        type="button"
                        disabled={product.stock <= 0}
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            addItem({ product_id: product.product_id, nombre: product.nombre, imagen: product.imagen ?? "", precio: product.precio, stock: product.stock });
                        }}
                        className="cursor-pointer disabled:cursor-disabled mt-3 flex items-center gap-2 rounded-lg bg-neutral-200 px-3 py-2 text-sm text-black hover:bg-neutral-300 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
                    >
                        <ShoppingCart className="size-4" />
                        {product.stock <= 0 ? "Agotado" : "Agregar"}
                    </button>
                </div>
            </div>
        </Link>
    );
}
 
export default Card;

export const CardSkeleton = () => {
    return (
        <div className="block w-full min-w-0 overflow-hidden rounded-xl bg-neutral-900">
            {/* Imagen */}
            <div className="h-48 w-full animate-pulse bg-neutral-800" />

            <div className="flex min-w-0 gap-1 p-4">
                <div className="min-w-0 flex-1">
                    {/* Nombre */}
                    <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-neutral-800" />

                    {/* Precio */}
                    <div className="mb-2 h-4 w-1/3 animate-pulse rounded bg-neutral-800" />

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                        <div className="h-3 w-20 animate-pulse rounded bg-neutral-800" />
                        <div className="h-3 w-6 animate-pulse rounded bg-neutral-800" />
                    </div>

                    {/* Botón */}
                    <div className="mt-3 h-9 w-28 animate-pulse rounded-lg bg-neutral-800" />
                </div>
            </div>
        </div>
    );
};
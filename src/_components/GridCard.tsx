import { Link } from "react-router-dom";
import { RatingStars, useProductRating } from "../lib/reviews";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/useCart";

const Card = (
    {id, nombre, imagen, precio, stock}:
    {id: number, nombre: string, imagen: string, precio: number, stock: number}
) => {
    const productRating = useProductRating(id);
    const { addItem } = useCart();

    return (
        <Link to={`/producto-${id}`} className="block w-full min-w-0 rounded-xl bg-neutral-900 cursor-pointer transition-colors duration-300">
            <img loading="lazy" className="w-full object-cover rounded-t-xl h-48" src={imagen} alt={nombre} />

            <div className="flex min-w-0 gap-1 p-4">
                <div className="min-w-0 flex-1">
                    <h3 className="mb-1 truncate font-medium text-[18px]">{nombre}</h3>
                    <p className="mb-1 text-md text-neutral-400 font-semibold">${precio}</p>
                    <div className="flex items-center gap-1">
                        <RatingStars rating={productRating.rating} className="text-xs" />
                        <span className="text-[10px] text-neutral-500">({productRating.count})</span>
                    </div>
                    <button
                        type="button"
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            addItem({ product_id: id, nombre, imagen, precio, stock });
                        }}
                        className="mt-3 flex items-center gap-2 rounded-lg bg-neutral-200 px-3 py-2 text-sm text-black hover:bg-neutral-300"
                    >
                        <ShoppingCart className="size-4" />
                        Agregar
                    </button>
                </div>
            </div>
        </Link>
    );
}
 
export default Card;
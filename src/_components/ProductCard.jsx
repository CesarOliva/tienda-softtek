import { ShoppingCart } from 'lucide-react';
import './styles/ProductList.css'
import { RatingStars, useProductRating } from "../lib/reviews";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

function ProductCard({ product }) {
    const productRating = useProductRating(product.product_id);
    const { addItem } = useCart();

    return (
        <Link to={`/producto-${product.product_id}`} className="ProductCard">
            <div className="ProductImageContainer">
                <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="ProductImage"
                />
            </div>

            <div className="ProductInfo">
                <div>
                    <h3>{product.nombre}</h3>

                    <div className="Precio">
                        <span className="Currency">MXN</span>
                        <span>${Number(product.precio).toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <RatingStars rating={productRating.rating} className="text-xs" />
                        <span className="text-xs text-neutral-400">({productRating.count})</span>
                    </div>

                    <div className="Descripcion">
                        <p>{product.descripcion}</p>
                    </div>
                </div>

                {product.stock > 0 && (
                    <button
                        type="button"
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            addItem(product);
                        }}
                        className="flex items-center cursor-pointer text-sm gap-3 bg-neutral-200 hover:bg-neutral-300 py-2 px-4 rounded-lg text-black"
                    >
                        <ShoppingCart className="size-4" />
                        Agregar al carrito
                    </button>
                )}
            </div>

        </Link>
    );
}



export default ProductCard;
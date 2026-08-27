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

                    <div className="flex items-center gap-1 mb-2">
                        <RatingStars rating={productRating.rating} className="text-xs" />
                        <span className="text-xs text-neutral-400">({productRating.count})</span>
                    </div>

                    <div className="Descripcion">
                        <p>{product.descripcion}</p>
                    </div>
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

        </Link>
    );
}



export default ProductCard;
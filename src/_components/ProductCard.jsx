import './ProductList.css'
import { Link } from "react-router-dom";
import { RatingStars, useProductRating } from "../lib/reviews";


function ProductCard({ product }) {
    const productRating = useProductRating(product.product_id);

    return (
        <Link to={`/producto-${product.product_id}`} className="ProductCard">

            <div className="ProductInfo">
                <h3>{product.nombre}</h3>

                <div className="Precio">
                    <p>Precio: $ {product.precio}</p>
                </div>

                <div className="flex items-center gap-1">
                    <RatingStars rating={productRating.rating} className="text-xs" />
                    <span className="text-xs text-neutral-400">({productRating.count})</span>
                </div>

                <div className="Descripcion">
                    <p>Descripcion:  {product.descripcion}</p>
                </div>

                <p>
                    {product.stock > 0 ? "En stock" : "Agotado"}
                </p>
            </div>

            {/* <div className="ProductImageContainer">
                <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="ProductImage"
                />
            </div> */}

        </Link>
    );
}



export default ProductCard;
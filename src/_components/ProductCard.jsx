import React from "react";
import './ProductList.css'
import { Link } from "react-router-dom";


function ProductCard({ product }) {
    return (
        <Link to={`producto-${product.id}`} className="ProductCard">

            <div className="ProductInfo">
                <h3>{product.nombre}</h3>

                <div className="Precio">
                    <p>Precio: $ {product.precio}</p>
                </div>

                  <div className="Descripcion">
                    <p>Descripcion:  {product.descripcion}</p>
                </div>

                <p>
                    {product.stock > 0 ? "En stock" : "Agotado"}
                </p>
            </div>

            <div className="ProductImageContainer">
                <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="ProductImage"
                />
            </div>

        </Link>
    );
}

 

 export default ProductCard;
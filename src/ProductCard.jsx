import React from "react";
import './ProductList.css'


function ProductCard({ product }) {
    return (
        <div className="ProductCard">

            <div className="ProductInfo">
                <h3>{product.nombre}</h3>

                <div className="Precio">
                    <p>Precio: $ {product.precio}</p>
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

        </div>
    );
}

 

 export default ProductCard;
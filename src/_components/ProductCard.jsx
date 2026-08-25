import { ShoppingCart } from 'lucide-react';
import './styles/ProductList.css'
import { Link } from "react-router-dom";

function ProductCard({ product }) {
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

                    <div className="Descripcion">
                        <p>{product.descripcion}</p>
                    </div>
                </div>

                {product.stock > 0 && (
                    <button
                        type="button"
                        onClick={()=>{}}
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

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { productos } from "../pages/Catalogo";
import Card from "./Card";

const Featured = () => {
    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-3xl">Productos destacados</h2>
                <Link to="/catalogo" className="text-neutral-300 flex items-center cursor-pointer gap-2">Ver todos <ArrowRight className="size-5" /></Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 mt-6">
                {productos.slice(0, 4).map((product) => (
                    <Card
                        key={product.id} 
                        id={product.id}
                        imagen={product.imagen}
                        nombre={product.nombre}
                        precio={product.precio}
                    />
                ))}
            </div>
        </div>
    );
}
 
export default Featured;
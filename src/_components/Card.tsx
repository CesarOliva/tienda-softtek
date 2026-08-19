import { Link } from "react-router-dom";

const Card = (
    {id, nombre, imagen, precio}:
    {id: number, nombre: string, imagen: string, precio: number}
) => {
    return (
        <Link to={`/producto-${id}`} className="block w-full min-w-0 rounded-xl bg-neutral-900 cursor-pointer transition-colors duration-300">
            <img loading="lazy" className="w-full object-cover rounded-t-xl h-48" src={imagen} alt={nombre} />

            <div className="flex min-w-0 gap-1 p-4">
                <div className="min-w-0 flex-1">
                    <h3 className="mb-1 truncate font-medium">{nombre}</h3>
                    <p className="mb-1 text-md text-neutral-400 font-semibold">${precio}</p>
                </div>
            </div>
        </Link>
    );
}
 
export default Card;
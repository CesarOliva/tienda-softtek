import { Link, useParams } from "react-router-dom";
import { productos } from "./Catalogo";
import ReactConfetti from "react-confetti";
import { useState } from "react";
import Menu from "../_components/Menu";

function Producto() {
    const { productId } = useParams();
    const [prefix, value] = productId?.split("-") ?? [];

    const id = prefix === "producto" && /^\d+$/.test(value)
        ? Number(value)
        : null;
        
    const product = productos.find(producto => producto.id === id);

    const [showConfetti, setShowConfetti] = useState(false);

    const handleComprar = () => {
        setShowConfetti(true);

        setTimeout(() => {
            setShowConfetti(false);
        }, 5000);
    };

    if (!product) {
        return (
            <main className="mx-auto flex min-h-screen max-w-4xl flex-col px-8 justify-center">
                <h2 className="text-5xl font-semibold mb-4 text-center">
                    Producto no encontrado
                </h2>

                <p className="text-lg font-light mb-8 text-center">
                    El producto que buscaste no fue encontrado.
                </p>

                <section className="flex justify-center">
                    <Link
                        to="/"
                        className="group flex items-center max-w-80 justify-center text-center text-lg gap-2 cursor-pointer bg-neutral-900 hover:bg-neutral-800 py-2 px-6 rounded-lg"
                    >
                        Volver a Inicio
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-8 md:justify-center mt-4 md:mt-12 mb-24">

            {showConfetti && (
                <ReactConfetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={500}
                />
            )}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 pb-8">
                <img
                    loading="lazy"
                    src={product.imagen}
                    alt={product.nombre}
                    className="rounded-2xl bg-neutral-900 block w-full object-contain transition-all duration-300"
                />

                <section className="flex flex-col justify-center">
                    <span className="text-xs uppercase tracking-[0.35em] text-neutral-400 mb-4 block">
                        Detalles del producto
                    </span>

                    <h1 className="text-5xl font-semibold mb-4">
                        {product.nombre}
                    </h1>

                    <p className="text-3xl font-light mb-2">
                        ${product.precio}
                    </p>

                    <p className="text-lg font-light mb-2">
                        {product.descripcion}
                    </p>

                    <button
                        type="button"
                        disabled={product.stock == 0}
                        onClick={handleComprar}
                        className="disabled:cursor-not-allowed cursor-pointer text-lg gap-2 disabled:bg-neutral-800 bg-neutral-900 hover:bg-neutral-800 py-2 px-6 rounded-lg"
                    >
                        {product.stock == 0 ? "No disponible" : "Comprar"}
                    </button>
                </section>
            </div>
        </main>
    );
}

export default Producto;
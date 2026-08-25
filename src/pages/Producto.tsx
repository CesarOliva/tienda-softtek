import { Link, useParams } from "react-router-dom";
import { productos } from "./Catalogo";
import ReactConfetti from "react-confetti";
import { useState, useEffect, type FormEvent } from "react";
import Menu from "../_components/Menu";
import Featured from "../_components/Featured";
import { getProductRating, RatingStars } from "../lib/reviews";

type Review = {
    id: number;
    content: string;
    rating: number;
    created_at: string;
};

function Producto() {
    const { productId } = useParams();
    const [prefix, value] = productId?.split("-") ?? [];

    const id = prefix === "producto" && /^\d+$/.test(value)
        ? Number(value)
        : null;
        
    const product = productos.find(producto => producto.id === id);

    const [showConfetti, setShowConfetti] = useState(false);

    // Estados para los comentarios locales
    const [reviews, setReviews] = useState<Review[]>([]);
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(5); // Estado de la calificación actual
    const [hoverRating, setHoverRating] = useState(0); // Estado para el efecto visual al pasar el cursor

    // Cargar comentarios desde localStorage al cambiar de producto
    useEffect(() => {
        if (id) {
            const savedReviews = localStorage.getItem(`reviews_prod_${id}`);
            if (savedReviews) {
                setReviews(JSON.parse(savedReviews));
            } else {
                setReviews([]);
            }
        }
    }, [id]);

    // Guardar nuevo comentario local
    const handleReviewSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!content.trim()) return alert("Por favor, escribe un comentario.");

        const newReview: Review = {
            id: Date.now(),
            content: content,
            rating: rating,
            created_at: new Date().toLocaleDateString()
        };

        const updatedReviews = [newReview, ...reviews];
        setReviews(updatedReviews);
        localStorage.setItem(`reviews_prod_${id}`, JSON.stringify(updatedReviews));
        window.dispatchEvent(new Event("reviews-updated"));

        // Limpiar el formulario y reiniciar estrellas a 5
        setContent("");
        setRating(5);
    };

    const handleComprar = () => {
        setShowConfetti(true);

        setTimeout(() => {
            setShowConfetti(false);
        }, 5000);
    };

    if (!product) {
        return (
            <main className="mx-auto flex min-h-screen max-w-4xl flex-col px-8 justify-center text-white">
                <h2 className="text-4xl font-normal tracking-tight mb-4 text-center">
                    Producto no encontrado
                </h2>

                <p className="text-neutral-400 font-light mb-8 text-center">
                    El producto que buscaste no fue encontrado.
                </p>

                <section className="flex justify-center">
                    <Link
                        to="/"
                        className="group flex items-center max-w-80 justify-center text-center text-sm font-medium tracking-wide bg-neutral-800 hover:bg-neutral-700 text-white py-2.5 px-6 rounded-md transition-colors"
                    >
                        Volver a Inicio
                    </Link>
                </section>
            </main>
        );
    }

    const productRating = getProductRating(id);

    return (
        <main className="mx-auto flex md:min-h-screen max-w-4xl flex-col gap-10 px-8 md:justify-center mt-12 mb-24 text-white">

            {showConfetti && (
                <ReactConfetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={400}
                />
            )}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 pb-8 border-b border-neutral-800 items-center">
                <img
                    loading="lazy"
                    src={product.imagen}
                    alt={product.nombre}
                    className="rounded-xl bg-neutral-900 block w-full object-contain aspect-square"
                />

                <section className="flex flex-col justify-center">
                    <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-3 font-medium">
                        Detalles del producto
                    </span>

                    <h1 className="text-4xl font-normal tracking-tight mb-3">
                        {product.nombre}
                    </h1>

                    <div className="flex items-center gap-2 mb-3">
                        <RatingStars rating={productRating.rating} className="text-sm" />
                        <span className="text-xs text-neutral-500">
                            {productRating.count > 0 ? `${productRating.rating}/5 (${productRating.count})` : "Sin opiniones"}
                        </span>
                    </div>

                    <p className="text-2xl font-light text-neutral-300 mb-3">
                        ${product.precio}
                    </p>

                    <p className="text-sm font-light text-neutral-400 leading-relaxed mb-6">
                        {product.descripcion}
                    </p>

                    <button
                        type="button"
                        disabled={product.stock == 0}
                        onClick={handleComprar}
                        className="disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-sm font-medium tracking-wide bg-white hover:bg-neutral-200 text-black py-3 px-6 rounded-md transition-all"
                    >
                        {product.stock == 0 ? "No disponible" : "Comprar"}
                    </button>
                </section>
            </div>

            <section className="flex flex-col gap-6 py-2 border-t border-neutral-800/60 pt-6">
                <div className="flex justify-between items-baseline">
                    <h2 className="text-2xl font-normal tracking-tight">Opiniones</h2>
                    <span className="text-xs text-neutral-500">{reviews.length} opiniones</span>
                </div>
                
                <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4 bg-neutral-900/40 p-5 rounded-xl border border-neutral-800/80">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Escribe tu reseña sobre este producto..."
                        className="w-full bg-neutral-900 text-white rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-700 placeholder-neutral-500 resize-none border border-neutral-800"
                    />
                    
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        {/* Selector interactivo de estrellas */}
                        <div className="flex items-center gap-1.5">
                            <span className="text-neutral-400 text-xs mr-1">Calificación:</span>
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => setRating(num)}
                                        onMouseEnter={() => setHoverRating(num)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="text-lg focus:outline-none transition-transform active:scale-95 cursor-pointer"
                                        style={{ color: num <= (hoverRating || rating) ? '#fbbf24' : '#404040' }}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="bg-white text-black text-xs font-medium uppercase tracking-wider py-2 px-4 rounded-md hover:bg-neutral-200 transition-colors cursor-pointer"
                        >
                            Publicar Review
                        </button>
                    </div>
                </form>

                <div className="flex flex-col gap-4 mt-2">
                    {reviews.length === 0 ? (
                        <p className="text-neutral-500 font-light text-xs text-center py-6">
                            No hay reseñas todavía. ¡Sé el primero en opinar!
                        </p>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="bg-neutral-900/20 p-4 rounded-xl border border-neutral-800/60 flex flex-col gap-1.5">
                                <div className="flex justify-between items-center">
                                    <div className="text-amber-400 text-xs tracking-wider">
                                        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                    </div>
                                    <span className="text-[10px] text-neutral-500">
                                        {review.created_at}
                                    </span>
                                </div>
                                <p className="text-neutral-300 font-light text-sm">{review.content}</p>
                            </div>
                        ))
                    )}
                </div>
            </section>

            <Featured/>
        </main>
    );
}

export default Producto;

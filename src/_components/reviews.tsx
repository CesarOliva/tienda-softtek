import { useEffect, useState, type FormEvent } from "react";

type Review = { id: number; content: string; rating: number; created_at: string };

export default function Reviews({ productId }: { productId: number }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        try {
            const savedReviews = localStorage.getItem(`reviews_prod_${productId}`);
            setReviews(savedReviews ? JSON.parse(savedReviews) : []);
        } catch {
            setReviews([]);
        }
    }, [productId]);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const reviewContent = content.trim();
        if (!reviewContent) return alert("Por favor, escribe un comentario.");

        const updatedReviews = [{
            id: Date.now(),
            content: reviewContent,
            rating,
            created_at: new Date().toLocaleDateString("es-MX")
        }, ...reviews];

        setReviews(updatedReviews);
        localStorage.setItem(`reviews_prod_${productId}`, JSON.stringify(updatedReviews));
        window.dispatchEvent(new Event("reviews-updated"));
        setContent("");
        setRating(5);
    }

    return (
        <section className="flex flex-col gap-6 py-2 border-t border-neutral-800/60 pt-6">
            <div className="flex justify-between items-baseline">
                <h2 className="text-2xl font-normal tracking-tight">Opiniones</h2>
                <span className="text-xs text-neutral-500">{reviews.length} opiniones</span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-neutral-900/40 p-5 rounded-xl border border-neutral-800/80">
                <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Escribe tu reseña sobre este producto..." className="w-full bg-neutral-900 text-white rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-700 placeholder-neutral-500 resize-none border border-neutral-800" />
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                        <span className="text-neutral-400 text-xs mr-1">Calificación:</span>
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <button key={value} type="button" aria-label={`${value} estrellas`} onClick={() => setRating(value)} onMouseEnter={() => setHoverRating(value)} onMouseLeave={() => setHoverRating(0)} className="text-lg focus:outline-none transition-transform active:scale-95 cursor-pointer" style={{ color: value <= (hoverRating || rating) ? "#fbbf24" : "#404040" }}>★</button>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="bg-white text-black text-xs font-medium uppercase tracking-wider py-2 px-4 rounded-md hover:bg-neutral-200 transition-colors cursor-pointer">Publicar reseña</button>
                </div>
            </form>

            <div className="flex flex-col gap-4 mt-2">
                {reviews.length === 0 ? (
                    <p className="text-neutral-500 font-light text-xs text-center py-6">No hay reseñas todavía. ¡Sé el primero en opinar!</p>
                ) : reviews.map((review) => (
                    <article key={review.id} className="bg-neutral-900/20 p-4 rounded-xl border border-neutral-800/60 flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                            <span className="text-amber-400 text-xs tracking-wider" aria-label={`${review.rating} de 5 estrellas`}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                            <span className="text-[10px] text-neutral-500">{review.created_at}</span>
                        </div>
                        <p className="text-neutral-300 font-light text-sm">{review.content}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

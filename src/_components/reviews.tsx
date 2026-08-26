import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../lib/supabaseClient";
import { Review } from "../../types/Review";

export default function Reviews({ productId }: { productId: number }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isCurrent = true;

        async function loadReviews() {
            setIsLoading(true);
            setErrorMessage("");

            const { data, error } = await supabase
                .from("product_reviews")
                .select("review_id, descripcion, calificacion, product_id, user_id")
                .eq("product_id", productId)
                .order("review_id", { ascending: false });

            if (!isCurrent) return;

            if (error) {
                setReviews([]);
                setErrorMessage("No fue posible cargar las reseñas.");
            } else {
                setReviews(data ?? []);
            }

            setIsLoading(false);
        }

        loadReviews();
        return () => { isCurrent = false; };
    }, [productId]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const descripcion = content.trim();

        if (!descripcion) {
            setErrorMessage("Por favor, escribe un comentario.");
            return;
        }

        setIsSubmitting(true);
        setErrorMessage("");

        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError || !authData.user) {
            setErrorMessage("Inicia sesión para publicar una reseña.");
            setIsSubmitting(false);
            return;
        }

        const { data, error } = await supabase
            .from("product_reviews")
            .insert({
                descripcion,
                calificacion: rating,
                product_id: productId,
                user_id: authData.user.id
            })
            .select("review_id, descripcion, calificacion, product_id, user_id")
            .single();

        setIsSubmitting(false);

        if (error || !data) {
            setErrorMessage("No fue posible publicar la reseña. Inténtalo de nuevo.");
            return;
        }

        setReviews((currentReviews) => [data, ...currentReviews]);
        setContent("");
        setRating(5);
        window.dispatchEvent(new Event("reviews-updated"));
    }

    return (
        <section className="flex flex-col gap-6 py-2 border-t border-neutral-800/60 pt-6">
            <div className="flex justify-between items-baseline">
                <h2 className="text-2xl font-normal tracking-tight">Opiniones</h2>
                <span className="text-xs text-neutral-500">{reviews.length} opiniones</span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-neutral-900/40 p-5 rounded-xl border border-neutral-800/80">
                <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder={"Escribe tu rese\u00f1a sobre este producto..."} className="w-full bg-neutral-900 text-white rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-700 placeholder-neutral-500 resize-none border border-neutral-800" />
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                        <span className="text-neutral-400 text-sm mr-1">Calificación:</span>
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <button key={value} type="button" aria-label={`${value} estrellas`} onClick={() => setRating(value)} onMouseEnter={() => setHoverRating(value)} onMouseLeave={() => setHoverRating(0)} className="text-lg focus:outline-none transition-transform active:scale-95 cursor-pointer" style={{ color: value <= (hoverRating || rating) ? "#fbbf24" : "#404040" }}>{"\u2605"}</button>
                            ))}
                        </div>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="bg-white text-black text-sm font-medium uppercase tracking-wider py-2 px-4 rounded-md hover:bg-neutral-200 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60">
                        {isSubmitting ? "Publicando..." : "Publicar reseña"}
                    </button>
                </div>
                {errorMessage && <p role="alert" className="text-xs text-red-400">{errorMessage}</p>}
            </form>

            <div className="flex flex-col gap-4 mt-2">
                {isLoading ? (
                    <p className="text-neutral-500 font-light text-sm text-center py-6">Cargando reseñas...</p>
                ) : reviews.length === 0 ? (
                    <p className="text-neutral-500 font-light text-sm text-center py-6">No hay reseñas todavía. ¡Sé el primero en opinar!</p>
                ) : reviews.map((review) => (
                    <article key={review.review_id} className="bg-neutral-900/20 p-4 rounded-xl border border-neutral-800/60 flex flex-col gap-1.5">
                        <span className="text-amber-400 text-xs tracking-wider" aria-label={`${review.calificacion} de 5 estrellas`}>{"\u2605".repeat(review.calificacion)}{"\u2606".repeat(5 - review.calificacion)}</span>
                        <p className="text-neutral-300 font-light text-sm">{review.descripcion}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

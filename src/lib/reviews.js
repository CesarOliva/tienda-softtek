import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const emptyRating = { rating: 0, count: 0 };

export async function getProductRating(productId) {
    if (!Number.isInteger(productId)) return emptyRating;

    const { data, error } = await supabase
        .from("product_reviews")
        .select("calificacion")
        .eq("product_id", productId);

    if (error || !data?.length) return emptyRating;

    const total = data.reduce((sum, review) => sum + review.calificacion, 0);
    return { rating: Math.round(total / data.length), count: data.length };
}

export function useProductRating(productId) {
    const [productRating, setProductRating] = useState(emptyRating);

    useEffect(() => {
        let isCurrent = true;

        async function updateRating() {
            const rating = await getProductRating(productId);
            if (isCurrent) setProductRating(rating);
        }

        updateRating();
        window.addEventListener("reviews-updated", updateRating);

        return () => {
            isCurrent = false;
            window.removeEventListener("reviews-updated", updateRating);
        };
    }, [productId]);

    return productRating;
}

export function RatingStars({ rating, className = "" }) {
    return React.createElement(
        "span",
        {
            className: `text-amber-400 tracking-wider ${className}`,
            "aria-label": `${rating} de 5 estrellas`
        },
        `${"\u2605".repeat(rating)}${"\u2606".repeat(5 - rating)}`
    );
}

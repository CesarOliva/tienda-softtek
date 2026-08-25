import React, { useEffect, useState } from "react";

const getReviewsKey = (productId) => `reviews_prod_${productId}`;

export function getProductRating(productId) {
    if (typeof window === "undefined") {
        return { rating: 5, count: 0 };
    }

    try {
        const savedReviews = localStorage.getItem(getReviewsKey(productId));
        const reviews = savedReviews ? JSON.parse(savedReviews) : [];
        const validRatings = reviews
            .map((review) => Number(review.rating))
            .filter((reviewRating) => reviewRating >= 1 && reviewRating <= 5);

        if (validRatings.length === 0) {
            return { rating: 5, count: 0 };
        }

        const average = validRatings.reduce((sum, reviewRating) => sum + reviewRating, 0) / validRatings.length;
        return { rating: Math.round(average), count: validRatings.length };
    } catch {
        return { rating: 5, count: 0 };
    }
}

export function useProductRating(productId) {
    const [productRating, setProductRating] = useState(() => getProductRating(productId));

    useEffect(() => {
        const updateRating = () => setProductRating(getProductRating(productId));
        window.addEventListener("reviews-updated", updateRating);
        window.addEventListener("storage", updateRating);

        return () => {
            window.removeEventListener("reviews-updated", updateRating);
            window.removeEventListener("storage", updateRating);
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
        `${"★".repeat(rating)}${"☆".repeat(5 - rating)}`
    );
}
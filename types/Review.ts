export type Review = {
    review_id: number;
    descripcion: string | null;
    calificacion: number;
    product_id: number;
    user_id: string;
};
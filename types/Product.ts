export type Product = {
    product_id: number;
    nombre: string;
    precio: number;
    descripcion: string | null;
    stock: number;
    category_id: number;
};
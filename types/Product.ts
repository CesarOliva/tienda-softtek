export type Product = {
    product_id: number;
    nombre: string;
    imagen: string;
    precio: number;
    descripcion: string | null;
    stock: number;
    category_id: number;
};
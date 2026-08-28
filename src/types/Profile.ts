export type Address = {
    address_id: number;
    calle: string | null;
    colonia: string | null;
    cp: string | null;
    ciudad: string | null;
    estado: string | null;
    referencia: string | null;
};

export type Purchase = {
    purchase_id: number;
    fecha: string;
};

export type PurchasedProduct = {
    purchase_id: number;
    product_id: number;
    cantidad: number;
};

export type Product = {
    product_id: number;
    nombre: string;
    precio: number;
};

export type HistoryRow = PurchasedProduct & {
    fecha: string;
    nombre: string;
    precio: number;
};
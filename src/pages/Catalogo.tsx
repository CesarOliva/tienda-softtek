import { Link } from "react-router-dom";
import Menu from "../_components/Menu";
import ProductCard from "../_components/ProductCard";
import Featured from "../_components/Featured";

export const productos = [
    {
        id: 1,
        nombre: "Mouse Gamer inalambrico",
        precio: 150,
        descripcion: "Mouse gamer con luces rgb y sensibilidad",
        imagen: "https://m.media-amazon.com/images/I/61QY3V6A-NL.jpg",
        stock: 5
    },
    {
        id: 2,
        nombre: "Audifonos inalambricos",
        precio: 200,
        descripcion: "Audifonos inalambricos con larga duracion de bateria",
        imagen: "https://m.media-amazon.com/images/I/71BFvz7N32L._AC_.jpg",
        stock: 0
    },
    {
        id: 3,
        nombre: "Cargador Samsung 65w",
        precio: 300,
        descripcion: "Cargador de carga super rapida",
        imagen: "https://www.macysdigital.com/wp-content/uploads/2025/01/Samsung-Cargador-Trio-65W-Negro.png",
        stock: 4
    },
    {
        id: 4,
        nombre: "Cargador Laptop 30w",
        precio: 200,
        descripcion: "Cargador de carga rapida",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_948355-MLV75911408960_042024-O.webp",
        stock: 4
    },
    {
        id: 5,
        nombre: "Reloj inteligente",
        precio: 999,
        descripcion: "Reloj inteligente con conexion satelital",
        imagen: "https://m.media-amazon.com/images/I/81MwG9dLIYL._AC_.jpg",
        stock: 9
    },
    {
        id: 6,
        nombre: "Teclado inalambrico",
        precio: 599,
        descripcion: "Teclado inalambrico con luces led",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_931030-MLM73621179176_122023-O.webp",
        stock: 3
    },
    {
        id: 7,
        nombre: "Audifonos Gamer",
        precio: 399,
        descripcion: "Audifonos alambricos gamer con sonido envolvente",
        imagen: "https://th.bing.com/th/id/R.03317460c1ddb5d64ef13cb912288390?rik=82ZKl3s97bUAGg&pid=ImgRaw&r=0",
        stock: 4
    },
    {
        id: 8,
        nombre: "Cargador plugin",
        precio: 100,
        descripcion: "Cargador para coche de carga rapida",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_882301-MCO70413434914_072023-O.webp",
        stock: 1
    },
    {
        id: 9,
        nombre: "teclado y mouse gamer",
        precio: 650,
        descripcion: "teclado con mouse inalambrico gamer",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_633025-MLU78555066256_082024-O.webp",
        stock: 1
    },
    {
        id: 10,
        nombre: "usb 1tb",
        precio: 899,
        descripcion: "usb con 1tb de almacenamiento",
        imagen: "https://th.bing.com/th/id/R.68ca04f058267945a0cc0de6f20e33c5?rik=sw%2bL4FdyclEL0Q&pid=ImgRaw&r=0",
        stock: 0
    },
    {
        id: 11,
        nombre: "usb 2tb",
        precio: 1200,
        descripcion: "usb con 2tb de almacenamiento",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_656843-MLM92661820753_092025-O.webp",
        stock: 0
    }
]

const Catalogo = () => {
    return (
        <>
            <section
                className="relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url("https://economipedia.com/wp-content/uploads/Tecnolog%C3%ADa-de-producto.jpg")` }}
            >
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 max-w-2xl px-6 text-center text-white">
                    <h2 className="catalogo mb-4 text-4xl font-bold md:text-5xl">Catálogo de productos</h2>
                    <p className="text-lg text-neutral-200 md:text-xl">Conoce los mejores productos de las mejores marcas. Solo en TechZone</p>
                </div>
            </section>
            <main className="mx-auto flex min-h-screen max-w-4xl flex-col px-8 justify-center my-12">
                <div className='Product'>
                    {productos.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </main>
        </>
    );
}

export default Catalogo;
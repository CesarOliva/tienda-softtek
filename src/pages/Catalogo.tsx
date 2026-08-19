import ProductCard from "../_components/ProductCard";

export const productos = [
    {
        id: 1,
        nombre: "Mouse Gamer inalambrico" ,
        precio: 150,
        descripcion: "Mouse gamer con luces rgb y sensibilidad",
        imagen: "https://m.media-amazon.com/images/I/61QY3V6A-NL.jpg",
        stock: 5
    },
    {
        id: 2,
        nombre: "Audifonos inalambricos" ,
        precio: 200,
        descripcion: "Audifonos inalambricos con larga duracion de bateria",
        imagen: "https://m.media-amazon.com/images/I/71BFvz7N32L._AC_.jpg",
        stock: 0 
    },
     {
        id: 3,
        nombre: "Cargador Samsung 65w" ,
        precio: 300,
        descripcion: "Cargador de carga super rapida",
        imagen: "https://www.macysdigital.com/wp-content/uploads/2025/01/Samsung-Cargador-Trio-65W-Negro.png",
        stock:4
    },
     {
        id: 4,
        nombre: "Cargador Laptop 30w" ,
        precio: 200,
        descripcion: "Cargador de carga rapida",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_948355-MLV75911408960_042024-O.webp",
        stock:4
    },
     {
        id: 5,
        nombre: "Reloj inteligente" ,
        precio: 999,
        descripcion: "Reloj inteligente con conexion satelital",
        imagen: "https://m.media-amazon.com/images/I/81MwG9dLIYL._AC_.jpg",
        stock:9
    },
     {
        id: 6,
        nombre: "Teclado inalambrico" ,
        precio: 599,
        descripcion: "Teclado inalambrico con luces led",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_931030-MLM73621179176_122023-O.webp",
        stock:3
    },
     {
        id: 7,
        nombre: "Audifonos Gamer" ,
        precio: 399,
        descripcion: "Audifonos alambricos gamer con sonido envolvente",
        imagen: "https://th.bing.com/th/id/R.03317460c1ddb5d64ef13cb912288390?rik=82ZKl3s97bUAGg&pid=ImgRaw&r=0",
        stock:4
    },
     {
        id: 8,
        nombre: "Cargador plugin" ,
        precio: 100,
        descripcion: "Cargador para coche de carga rapida",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_882301-MCO70413434914_072023-O.webp",
        stock:1
    },
     {
        id: 9,
        nombre: "teclado y mouse gamer" ,
        precio: 650,
        descripcion: "teclado con mouse inalambrico gamer",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_633025-MLU78555066256_082024-O.webp",
        stock:1
    },
    {
        id: 10,
        nombre: "usb 1tb" ,
        precio: 899,
        descripcion: "usb con 1tb de almacenamiento",
        imagen: "https://th.bing.com/th/id/R.68ca04f058267945a0cc0de6f20e33c5?rik=sw%2bL4FdyclEL0Q&pid=ImgRaw&r=0",
        stock:0
    }
]

const Catalogo = () => {
    return ( 
        <main className="mx-auto flex min-h-screen max-w-4xl flex-col px-8 justify-center my-8">
            <h2 className="text-4xl my-4">Lista</h2> 
            <div className='Product'>
            {productos.map((product) => (
                <ProductCard key={product.id} product = {product} />
            ))}
            </div>
        </main>
    );
}
 
export default Catalogo ; 
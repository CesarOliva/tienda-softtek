export const productos = [
    {
        id: 1,
        nombre: "Mouse Gamer inalambrico" ,
        precio: 150,
        descripcion: "Mouse gamer con luces rgb y sensibilidad",
        imagen: "https://m.media-amazon.com/images/I/61QY3V6A-NL.jpg"
    },
    {
        id: 2,
        nombre: "Audifonos inalambricos" ,
        precio: 200,
        descripcion: "Audifonos inalambricos con larga duracion de bateria",
        imagen: "https://m.media-amazon.com/images/I/71BFvz7N32L._AC_.jpg" 
    },
     {
        id: 3,
        nombre: "Cargador Samsung 65w" ,
        precio: 300,
        descripcion: "Cargador de carga super rapida",
        imagen: "https://www.macysdigital.com/wp-content/uploads/2025/01/Samsung-Cargador-Trio-65W-Negro.png"
    },
     {
        id: 4,
        nombre: "Cargador Laptop 30w" ,
        precio: 200,
        descripcion: "Cargador de carga rapida",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_948355-MLV75911408960_042024-O.webp"
    },
     {
        id: 5,
        nombre: "Reloj inteligente" ,
        precio: 999,
        descripcion: "Reloj inteligente con conexion satelital",
        imagen: "https://m.media-amazon.com/images/I/81MwG9dLIYL._AC_.jpg"
    },
     {
        id: 6,
        nombre: "Teclado inalambrico" ,
        precio: 599,
        descripcion: "Teclado inalambrico con luces led",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_931030-MLM73621179176_122023-O.webp"
    },
     {
        id: 7,
        nombre: "Audifonos Gamer" ,
        precio: 399,
        descripcion: "Audifonos alambricos gamer con sonido envolvente",
        imagen: "https://th.bing.com/th/id/R.03317460c1ddb5d64ef13cb912288390?rik=82ZKl3s97bUAGg&pid=ImgRaw&r=0"
    },
     {
        id: 8,
        nombre: "Cargador plugin" ,
        precio: 100,
        descripcion: "Cargador para coche de carga rapida",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_882301-MCO70413434914_072023-O.webp"
    },
     {
        id: 9,
        nombre: "teclado y mouse gamer" ,
        precio: 650,
        descripcion: "teclado con mouse inalambrico gamer",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_633025-MLU78555066256_082024-O.webp"
    },
    {
        id: 10,
        nombre: "usb 1tb" ,
        precio: 899,
        descripcion: "usb con 1tb de almacenamiento",
        imagen: "https://th.bing.com/th/id/R.68ca04f058267945a0cc0de6f20e33c5?rik=sw%2bL4FdyclEL0Q&pid=ImgRaw&r=0"
    }
]

const Catalogo = () => {
    return ( 
        <>
            {productos}
            {productos.map((product)=>{
                <h2>{product.id}</h2>
            })}
        </>
    );
}
 
export default Catalogo ; 
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Carousel.css";

const products = [
  {
    product_id: 8,
    //imagen: "https://m.media-amazon.com/images/I/61QY3V6A-NL.jpg",
    nombre: "Mouse Gamer RGB 7200 DPI",
    descripcion: "Mouse gamer con iluminacion RGB y alta precision",
  },
  {
    product_id: 13,
    //imagen: "https://m.media-amazon.com/images/I/71BFvz7N32L._AC_.jpg",
    nombre: "Teclado Mecanico RGB",
    descripcion: "Teclado mecanico con retroiluminacion RGB",
  },
  {
    product_id: 18,
    //imagen: "https://i.etsystatic.com/31350528/r/il/016838/5582580533/il_794xN.5582580533_483u.jpg",
    nombre: "Memoria USB 64GB",
    descripcion: "Memoria USB 3.0 de 64GB",
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="carousel">
      <button className="prev" onClick={prevSlide} aria-label="Imagen anterior">&#10094;</button>
      <Link
        to={`/producto-${products[currentIndex].product_id}`}
        className="carousel-slide"
      >
        <div className="carousel-copy">
          <span>TIENDA</span>
          <h1>{products[currentIndex].nombre}</h1>
          <p>{products[currentIndex].descripcion}</p>
        </div>
        <img src={products[currentIndex].imagen} alt={products[currentIndex].nombre} />
      </Link>
      <button className="next" onClick={nextSlide} aria-label="Siguiente imagen">&#10095;</button>

      <div className="indicators">
        {products.map((product, index) => (
          <span
            key={product.product_id}
            className={index === currentIndex ? "active" : ""}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Carousel.css";

const products = [
  {
    src: "https://m.media-amazon.com/images/I/61QY3V6A-NL.jpg",
    title: "Sube de nivel...",
    text: "Mouse ultra ligeo 69 gramos.",
  },
  {
    src: "https://m.media-amazon.com/images/I/71BFvz7N32L._AC_.jpg",
    title: "30% de descuento",
    text: "Audifonoscde la marca sony",
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
          <h1>{images[currentIndex].title}</h1>
          <p>{images[currentIndex].text}</p>
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

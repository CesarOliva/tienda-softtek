import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Carousel.css";

const carouselSlides = [
  {
    src: "/images/carousel/producto-1.png",
    category: "cargadores",
    eyebrow: "TechZone",
    title: "20% de descuento",
    description: "Cargadores y otros accesorios.",
  },
  {
    src: "/images/carousel/producto-2.png",
    category: "teclados",
    eyebrow: "TechZone",
    title: "LLega a tu máximo nivel",
    description: "Encuentra tu teclado ideal.",
  },
  {
    src: "/images/carousel/producto-3.png",
    category: "mouse",
    eyebrow: "TechZone",
    title: "Descrubre tu estilo",
    description: "Los mejores mouses para Ti.",
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  if (carouselSlides.length === 0) return null;

  const currentSlide = carouselSlides[currentIndex % carouselSlides.length];

  return (
    <div className="carousel">
      <button className="prev" onClick={prevSlide} aria-label="Imagen anterior">&#10094;</button>
      <Link
        to={`/catalogo?categoria=${currentSlide.category}`}
        className="carousel-slide"
      >
        <div className="carousel-copy">
          <span>{currentSlide.eyebrow}</span>
          <h1>{currentSlide.title}</h1>
          <p>{currentSlide.description}</p>
        </div>
        <img src={currentSlide.src} alt={currentSlide.title} />
      </Link>
      <button className="next" onClick={nextSlide} aria-label="Siguiente imagen">&#10095;</button>

      <div className="indicators">
        {carouselSlides.map((slide, index) => (
          <span
            key={index}
            className={index === currentIndex ? "active" : ""}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Carousel.css";
import { supabase } from "../lib/supabaseClient";

const carouselSlides = [
  {
    src: "/images/carousel/producto-1.png",
    eyebrow: "TechZone",
    title: "-20% de descuento",
    description: "Cargadores",
  },
  {
    src: "/images/carousel/producto-2.png",
    eyebrow: "TechZone",
    title: "Producto destacado 2",
    description: "Tecnologia pensada para acompanarte todos los dias.",
  },
  {
    src: "/images/carousel/producto-3.png",
    eyebrow: "TechZone",
    title: "Producto destacado 3",
    description: "Encuentra el equipo ideal para tus necesidades.",
  },
];

export default function Carousel() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function getProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("product_id")
        .limit(3);

      if (error) {
        console.error("Error fetching carousel products:", error);
        return;
      }

      setProducts(data ?? []);
    }

    getProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [products.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  if (products.length === 0) return null;

  const currentSlide = carouselSlides[currentIndex % carouselSlides.length];

  return (
    <div className="carousel">
      <button className="prev" onClick={prevSlide} aria-label="Imagen anterior">&#10094;</button>
      <Link
        to={`/producto-${products[currentIndex].product_id}`}
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

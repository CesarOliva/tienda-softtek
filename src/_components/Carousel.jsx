import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Carousel.css";
import { supabase } from "../lib/supabaseClient";
import { addProductImage } from "../lib/productImages";

export default function Carousel() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function getProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*, images (ruta)")
        .order("product_id")
        .limit(3);

      if (error) {
        console.error("Error fetching carousel products:", error);
        return;
      }

      setProducts((data ?? []).map(addProductImage));
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

  return (
    <div className="carousel">
      <button className="prev" onClick={prevSlide} aria-label="Imagen anterior">&#10094;</button>
      <Link
        to={`/producto-${products[currentIndex].product_id}`}
        className="carousel-slide"
      >
        <div className="carousel-copy">
          <span>TechZone</span>
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

import { useEffect, useState } from "react";
import "./Carousel.css";

const images = [
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
    src: "https://i.etsystatic.com/31350528/r/il/016838/5582580533/il_794xN.5582580533_483u.jpg",
    title: "Cuchao",
    text: "Funda del rayo mcqueen",
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <button className="prev" onClick={prevSlide} aria-label="Imagen anterior">&#10094;</button>
      <div className="carousel-slide">
        <div className="carousel-copy">
          <span>TIENDA</span>
          <h1>{images[currentIndex].title}</h1>
          <p>{images[currentIndex].text}</p>
        </div>
        <img src={images[currentIndex].src} alt={images[currentIndex].title} />
      </div>
      <button className="next" onClick={nextSlide} aria-label="Siguiente imagen">&#10095;</button>

      <div className="indicators">
        {images.map((image, index) => (
          <span
            key={image.src}
            className={index === currentIndex ? "active" : ""}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

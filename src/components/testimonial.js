import React, { useState, useEffect } from "react";
import "./carousal.css";

function Testimonials() {
  const testimonials = [
    { id: 1, name: "Sumit Singh", feedback: "Lorem ipsum...", rating: 4 },
    { id: 2, name: "Sumit Singh", feedback: "Lorem ipsum...", rating: 4 },
    { id: 3, name: "Sumit Singh", feedback: "Lorem ipsum...", rating: 5 },
    { id: 4, name: "Sumit Singh", feedback: "Lorem ipsum...", rating: 4 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 480) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 768) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < testimonials.length ? prevIndex + 1 : prevIndex
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : prevIndex
    );
  };

  return (
    <div className="testimonials-slider">
      <button onClick={prevSlide} className="slider-btn" disabled={currentIndex === 0}>❮</button>
      
      <div className="testimonials-wrapper">
        <h4 className="testimonial-head">Customer Testimonials</h4>
        <div
          className="testimonials-container"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-item">
              <p className="testimonial-name">{testimonial.name}</p>
              <p>"{testimonial.feedback}"</p>
              <div className="star-rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < testimonial.rating ? 'star filled' : 'star'}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={nextSlide} className="slider-btn" disabled={currentIndex + itemsPerSlide >= testimonials.length}>❯</button>
    </div>
  );
}

export default Testimonials;

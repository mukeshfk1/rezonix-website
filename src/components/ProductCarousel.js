import React, { useState, useEffect } from "react";
import "./carousal.css";
import rezonixMainPage from './rezonixMainPage.jpg';
import imgs1 from './imgs1.jpg';
import imgs2 from './imgs2.jpg';
import Rezo_bck from './Rezo_bck.jpg';


function ProductCarousel() {
  const images = [rezonixMainPage, imgs1, imgs2, Rezo_bck];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < images.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex; // Keep the index at the last image
    });
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex; // Keep the index at the first image
    });
  };

  // Automatically change image every 3 seconds
useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex < images.length - 1) {
          return prevIndex + 1;
        }
        clearInterval(interval); // Stop automatic sliding at the last image
        return prevIndex;
      });
    }, 3000);
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);


return (
    <section className="carousel">
      <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="carousel-image-container">
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="carousel-image"
            />
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button onClick={prevImage} className="carousel-btn" disabled={currentIndex === 0}>❮</button>
        <button onClick={nextImage} className="carousel-btn" disabled={currentIndex === images.length - 1}>❯</button>
      </div>
    </section>
  );
}

export default ProductCarousel;

// components/common/Slider.js
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Slider.module.css";

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(false);

  const nextSlide = () => {
    setDirection(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const boxVariants = {
    entry: (direction) => ({
      x: direction ? -500 : 500,
      opacity: 0,
      scale: 0,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      x: direction ? 500 : -500,
      opacity: 0,
      scale: 0,
      transition: { duration: 0.5 },
    }),
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            custom={direction}
            variants={boxVariants}
            key={currentIndex}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            initial="entry"
            animate="center"
            exit="exit"
            className={styles.image}
          />
        </AnimatePresence>
      </div>

      {currentIndex !== 0 && (
        <button onClick={prevSlide} className={styles.prevButton}>
          <img
            src="/icons/Vector.svg"
            alt="Previous"
            className={styles.prevButtonImg}
          />
        </button>
      )}

      {currentIndex !== images.length - 1 && (
        <button onClick={nextSlide} className={styles.nextButton}>
          <img
            src="/icons/Vector.svg"
            alt="Next"
            className={styles.nextButtonImg}
          />
        </button>
      )}

      <div className={styles.slideInfo}>
        {currentIndex + 1} of {images.length}
      </div>
    </div>
  );
};

export default Slider;

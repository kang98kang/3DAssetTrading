"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./detailpage.module.css";

const images = [
  { src: "/images/image1.jpg", alt: "Image 1" },
  { src: "/images/image2.jpg", alt: "Image 2" },
  { src: "/images/image3.webp", alt: "Image 3" },
  { src: "/images/image4.webp", alt: "Image 4" },
];

export default function Detail() {
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

  const handleThumbnailClick = (index) => {
    setDirection(index > currentIndex ? false : true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    console.log("Slider is rendered");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
          <button onClick={prevSlide} className={styles.prevButton}></button>
        )}

        {currentIndex !== images.length - 1 && (
          <button onClick={nextSlide} className={styles.nextButton}></button>
        )}
      </div>

      <div className={styles.thumbnailContainer}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.thumbnail} ${
              currentIndex === index ? styles.activeThumbnail : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={styles.thumbnailImage}
            />
          </div>
        ))}
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <p>작성자 게시글 표시 부분</p>
        </div>
        <div className={styles.sideContent}>
          <div className={styles.sideItem}>EXTENSION</div>
          <div className={styles.sideItem}>RENDERING</div>
          <div className={styles.sideItem}>MODELING</div>
          <div className={styles.sideItem}>Animated</div>
        </div>
      </div>
    </motion.div>
  );
}

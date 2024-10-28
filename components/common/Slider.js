"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Slider.module.css";
import Image from "next/image";

const thumbnailPerPage = 20;

const Slider = ({ images, currentIndex, setCurrentIndex }) => {
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

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(images.length / thumbnailPerPage);

  const handleNextThumbnail = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevThumbnail = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleThumbnailClick = (index) => {
    if (currentIndex < index) {
      setDirection(false);
    } else {
      setDirection(true);
    }

    setCurrentIndex(index);
  };

  const currentThumbnails = images.slice(
    currentPage * thumbnailPerPage,
    (currentPage + 1) * thumbnailPerPage
  );

  const boxVariants = {
    entry: (direction) => ({
      x: direction ? -500 : 500,
      y: 0,
      opacity: 0,
      scale: 0,
    }),
    center: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      x: direction ? 500 : -500,
      y: 0,
      opacity: 0,
      scale: 0,
      transition: { duration: 0.5 },
    }),
  };

  return (
    <div>
      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
          <AnimatePresence initial={false} custom={direction}>
            {images.length > 0 && (
              <motion.img
                custom={direction}
                variants={boxVariants}
                key={currentIndex}
                src={images[currentIndex]}
                alt={images[currentIndex]}
                initial="entry"
                animate="center"
                exit="exit"
                className={styles.image}
              />
            )}
          </AnimatePresence>
        </div>

        {currentIndex !== 0 && (
          <button onClick={prevSlide} className={styles.prevButton}>
            <Image
              src="/icons/Vector.svg"
              alt="Previous"
              className={styles.prevButtonImg}
              width={25}
              height={25}
            />
          </button>
        )}
        {currentIndex !== images.length - 1 && (
          <button onClick={nextSlide} className={styles.nextButton}>
            <Image
              src="/icons/Vector.svg"
              alt="Next"
              className={styles.nextButtonImg}
              width={25}
              height={25}
            />
          </button>
        )}
        <div className={styles.thumbnailContainer}>
          <div className={styles.thumbnailImgContainer}>
            {currentThumbnails.map((image, index) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${
                  currentIndex === index + currentPage * thumbnailPerPage
                    ? styles.activeThumbnail
                    : ""
                }`}
                onClick={() =>
                  handleThumbnailClick(index + currentPage * thumbnailPerPage)
                }
              >
                {typeof image === "string" &&
                  (image.startsWith("http") || image.startsWith("/")) && (
                    <Image
                      src={image}
                      alt="Thumbnail"
                      className={styles.thumbnailImage}
                      width={15}
                      height={15}
                    />
                  )}
              </div>
            ))}

            {images.length > 19 && (
              <>
                <button
                  className={styles.prevPaginationButton}
                  onClick={handlePrevThumbnail}
                  disabled={currentPage === 0}
                >
                  <Image
                    src="/icons/Vector.svg"
                    alt="Previous"
                    className={styles.prevButtonImg}
                    width={15}
                    height={15}
                  />
                </button>

                <button
                  className={styles.nextPaginationButton}
                  onClick={handleNextThumbnail}
                  disabled={currentPage >= totalPages - 1}
                >
                  <Image
                    src="/icons/Vector.svg"
                    alt="Next"
                    className={styles.nextButtonImg}
                    width={15}
                    height={15}
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;

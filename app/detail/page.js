"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./detailpage.module.css";
import Button from "@/components/common/Button";

const images = [
  { src: "/images/image1.jpg", alt: "Image 1" },
  { src: "/images/image2.jpg", alt: "Image 2" },
  { src: "/images/image3.webp", alt: "Image 3" },
  { src: "/images/image4.webp", alt: "Image 4" },
  { src: "/images/image1.jpg", alt: "Image 1" },
  { src: "/images/image2.jpg", alt: "Image 2" },
  { src: "/images/image3.webp", alt: "Image 3" },
  { src: "/images/image4.webp", alt: "Image 4" },
  { src: "/images/image1.jpg", alt: "Image 1" },
  { src: "/images/image2.jpg", alt: "Image 2" },
  { src: "/images/image3.webp", alt: "Image 3" },
  { src: "/images/image4.webp", alt: "Image 4" },
  { src: "/images/image1.jpg", alt: "Image 1" },
  { src: "/images/image2.jpg", alt: "Image 2" },
  { src: "/images/image3.webp", alt: "Image 3" },
  { src: "/images/image4.webp", alt: "Image 4" },
  { src: "/images/image1.jpg", alt: "Image 1" },
  { src: "/images/image2.jpg", alt: "Image 2" },
  { src: "/images/image3.webp", alt: "Image 3" },
  { src: "/images/image4.webp", alt: "Image 4" },
  { src: "/images/image1.jpg", alt: "Image 1" },
  { src: "/images/image2.jpg", alt: "Image 2" },
  { src: "/images/image3.webp", alt: "Image 3" },
  { src: "/images/image4.webp", alt: "Image 4" },
  { src: "/images/image1.jpg", alt: "Image 1" },
  { src: "/images/image2.jpg", alt: "Image 2" },
  { src: "/images/image3.webp", alt: "Image 3" },
  { src: "/images/image4.webp", alt: "Image 4" },
  { src: "/images/image1.jpg", alt: "Image 1" },
  { src: "/images/image2.jpg", alt: "Image 2" },
  { src: "/images/image3.webp", alt: "Image 3" },
  { src: "/images/image4.webp", alt: "Image 4" },
  { src: "/images/image1.jpg", alt: "Image 1" },
  { src: "/images/image2.jpg", alt: "Image 2" },
  { src: "/images/image3.webp", alt: "Image 3" },
  { src: "/images/image4.webp", alt: "Image 4" },
  { src: "/images/image1.jpg", alt: "Image 1" },
  { src: "/images/image2.jpg", alt: "Image 2" },
  { src: "/images/image3.webp", alt: "Image 3" },
  { src: "/images/image4.webp", alt: "Image 4" },
];

const thumbnailPerPage = 20;

export default function Detail() {
  const language = useSelector((state) => state.language.language);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    fetch("/language.json")
      .then((response) => response.json())
      .then((data) => setTranslations(data));
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
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

  const currentThumbnails = images.slice(
    currentPage * thumbnailPerPage,
    (currentPage + 1) * thumbnailPerPage
  );

  const totalPages = Math.ceil(images.length / thumbnailPerPage);

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
      <div className={styles.minheader}>
        <div className={styles.productContainer}>
          <div className={styles.leftSection}>
            <span className={styles.filename}>filename</span>
          </div>
          <div className={styles.rightSection}>
            <span className={styles.price}>Price</span>
            <Button
              backgroundColor="#3a3a3a"
              width="auto"
              height="40px"
              label={translations[language]?.Detail[0]}
            />
            <Button
              backgroundColor="#3a3a3a"
              width="auto"
              height="40px"
              label={translations[language]?.Detail[1]}
            />
          </div>
        </div>
      </div>
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

      <div>
        <div className={styles.thumbnailContainer}>
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
              <img
                src={image.src}
                alt={image.alt}
                className={styles.thumbnailImage}
              />
            </div>
          ))}

          <div className={styles.paginationButtons}>
            <button
              className={styles.prevPaginationButton}
              onClick={handlePrevThumbnail}
              disabled={currentPage === 0}
            >
              prev
            </button>
            <button
              className={styles.nextPaginationButton}
              onClick={handleNextThumbnail}
              disabled={currentPage >= totalPages - 1}
            >
              next
            </button>
          </div>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <p>작성자 게시글 표시 부분</p>
        </div>
        <div className={styles.sideContent}>
          <div className={styles.sideItem}>
            <div className={styles.sideTitle}>FILE</div>
            <div className={styles.sideContentDetail}>FILE 들어갈 부분</div>
          </div>
          <div className={styles.sideItem}>
            <div className={styles.sideTitle}>PROGRAM</div>
            <div className={styles.sideContentDetail}>PROGRAM 들어갈 부분</div>
          </div>
          <div className={styles.sideItem}>
            <div className={styles.sideTitle}>ETC</div>
            <div className={styles.sideContentDetail}>ETC 들어갈 부분</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

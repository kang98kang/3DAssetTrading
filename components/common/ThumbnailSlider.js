// components/common/ThumbnailSlider.js
"use client";

import { useState } from "react";
import styles from "./ThumbnailSlider.module.css";

const thumbnailPerPage = 20;

const ThumbnailSlider = ({ images, currentIndex, setCurrentIndex }) => {
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
    setCurrentIndex(index);
  };

  const currentThumbnails = images.slice(
    currentPage * thumbnailPerPage,
    (currentPage + 1) * thumbnailPerPage
  );

  return (
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
  );
};

export default ThumbnailSlider;

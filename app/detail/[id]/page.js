"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../detailpage.module.css";
import Button from "@/components/common/Button";
import Slider from "@/components/common/Slider";

const images = [
  { src: "/images/image1.jpg", alt: "Image 1" },
  { src: "/images/image2.jpg", alt: "Image 2" },
  { src: "/images/image3.webp", alt: "Image 3" },
  { src: "/images/image4.webp", alt: "Image 4" },
];

export default function Detail() {
  const id = 1;
  const language = useSelector((state) => state.language.language);
  const [translations, setTranslations] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/language.json")
      .then((response) => response.json())
      .then((data) => setTranslations(data));
  }, []);

  return (
    <div className={styles.test}>
      <div className={styles.minheader}>
        <div className={styles.productContainer}>
          <div className={styles.leftSection}>
            <span className={styles.filename}>Filename: {id}</span>
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

      <div className={styles.slideInfo}>
        {currentIndex + 1} of {images.length}
      </div>

      <Slider
        images={images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

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
    </div>
  );
}
"use client";

import { useState } from "react";
import { useLanguageData } from "../../../components/hooks/useLanguageData"
import Button from "@/components/common/Button";
import Slider from "@/components/common/Slider";
import styles from "../detailpage.module.css";

const images = [
  { src: "/images/image1.jpg", alt: "Image 1" },
  { src: "/images/image2.jpg", alt: "Image 2" },
  { src: "/images/image3.webp", alt: "Image 3" },
  { src: "/images/image4.webp", alt: "Image 4" },
];

export default function Detail() {
  const id = 1;
  const [currentIndex, setCurrentIndex] = useState(0);

  const { language, translations } = useLanguageData();

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
              backgroundColor={
                process.env.NEXT_PUBLIC_BACKGROUND_COLOR_TERTIARY
              }
              width="auto"
              height="40px"
              label={translations[language]?.Detail[0]}
            />
            <Button
              backgroundColor={
                process.env.NEXT_PUBLIC_BACKGROUND_COLOR_TERTIARY
              }
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

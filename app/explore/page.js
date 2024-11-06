"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Slider from "rc-slider";
import { useLanguageData } from "../../components/hook/useLanguageData";
import { useFetchData } from "../../components/hook/useFetchData";
import "rc-slider/assets/index.css";
import styles from "./explorepage.module.css";

function ExploreContent() {
  // 모델 필터 선택 효과 및 애니메이션
  const modelFilter = [
    "Autodesk-FBX",
    "3ds-Max",
    "Blender",
    "OBJ-wavefront",
    "Cinema-4D",
    "Maya",
    "LightWave",
    "Modo",
    "SketchUp",
    "Stereolithography",
    "Unity",
    "Unreal",
    "Collada",
    "Polygon-File-Format",
  ];

  const [selectedModelFilter, setSelectedModelFilter] = useState([]);
  const [unselectedModelFilter, setUnselectedModelFilter] = useState([
    ...modelFilter,
  ]);

  const handleSelectModelFilter = (filterName) => {
    setSelectedModelFilter((prev) => [...prev, filterName]);
    setUnselectedModelFilter((prev) =>
      prev.filter((filter) => filter !== filterName)
    );
  };

  const handleDeselectModelFilter = (filterName) => {
    setSelectedModelFilter((prev) =>
      prev.filter((filter) => filter !== filterName)
    );
    setUnselectedModelFilter((prev) => {
      const updatedModelFilter = [...prev, filterName];
      return updatedModelFilter.sort(
        (a, b) => modelFilter.indexOf(a) - modelFilter.indexOf(b)
      );
    });
  };

  const getModelFilterItemVariants = (filterName, isSelected) => {
    if (isSelected) {
      return {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, filter: "grayscale(0%)" },
        exit: { opacity: 0, scale: 0.8 },
      };
    } else {
      return {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, filter: "grayscale(100%)" },
        exit: { opacity: 0, scale: 0.8 },
      };
    }
  };

  // URL에서 쿼리 파라미터 추출 후 라우팅
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const category = searchParams.get("category") || "";

  const router = useRouter();

  const handleCardClick = (index) => {
    router.push(`/detail/${index}`);
  };

  // 탐색 데이터 API
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isAnimated, setIsAnimated] = useState(false);
  const { data, setRequestData } = useFetchData({
    name,
    category,
    program: selectedModelFilter,
    priceMin: priceRange[0],
    priceMax: priceRange[1],
    isAnimated,
  });

  useEffect(() => {
    setRequestData({
      name,
      category,
      program: selectedModelFilter,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      isAnimated,
    });
  }, [name, category, selectedModelFilter, isAnimated]);

  const handleAfterChange = (newRange) => {
    setPriceRange(newRange);
    setRequestData((prevRequestData) => ({
      ...prevRequestData,
      priceMin: newRange[0],
      priceMax: newRange[1],
    }));
  };

  // 카테고리 언어 변경
  const { language, translations } = useLanguageData();

  const getTranslatedCategory = (category, translations, language) => {
    if (!category) return translations[language]?.Explore[0];

    const lowercaseCategory = category.toLowerCase();
    const enExploreLowercase = translations["en"]?.Explore.map((item) =>
      item.toLowerCase()
    );

    const categoryIndex = enExploreLowercase.indexOf(lowercaseCategory);

    return categoryIndex !== -1
      ? translations[language]?.Explore[categoryIndex]
      : translations[language]?.Explore[0];
  };

  // 카드 호버 효과
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredItemId(id);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  return (
    <div className={styles.paperback}>
      <div className={styles.nav}>
        <motion.div
          className={styles.flexContainer}
          initial="hidden"
          animate="visible"
        >
          {selectedModelFilter.map((filterName) => (
            <motion.div
              key={filterName}
              className={styles.inner}
              onClick={() => handleDeselectModelFilter(filterName)}
              layout="position"
              variants={getModelFilterItemVariants(filterName, true)}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <div
                className={`${styles.filter} ${styles.selected}`}
                style={{
                  backgroundImage: `url(/images/explore/${filterName}.png)`,
                }}
                title={filterName}
              ></div>
            </motion.div>
          ))}
          {unselectedModelFilter.map((filterName) => (
            <motion.div
              key={filterName}
              className={styles.inner}
              onClick={() => handleSelectModelFilter(filterName)}
              layout="position"
              variants={getModelFilterItemVariants(filterName, false)}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <div
                className={`${styles.filter}`}
                style={{
                  backgroundImage: `url(/images/explore/${filterName}.png)`,
                }}
                title={filterName}
              ></div>
            </motion.div>
          ))}
        </motion.div>
        <div className={styles.divider}>
          <form className={styles.sliderForm}>
            <label className={styles.label}>
              <div className={styles.priceLabel}>Price</div>
              <Slider
                range
                min={0}
                max={1000}
                step={10}
                marks={{
                  [priceRange[0]]: {
                    style: {
                      color: process.env.NEXT_PUBLIC_ACCENT_COLOR_PRIMARY,
                      top: "-3px",
                    },
                    label: `${priceRange[0]}$`,
                  },
                  [priceRange[1]]: {
                    style: {
                      color: process.env.NEXT_PUBLIC_ACCENT_COLOR_PRIMARY,
                      top: "-3px",
                    },
                    label: `${priceRange[1]}$`,
                  },
                  0: {
                    style: {
                      color: process.env.NEXT_PUBLIC_TEXT_COLOR_PRIMARY,
                      top: "-37px",
                    },
                    label: "0$",
                  },
                  1000: {
                    style: {
                      color: process.env.NEXT_PUBLIC_TEXT_COLOR_PRIMARY,
                      top: "-37px",
                    },
                    label: "1000$",
                  },
                }}
                value={priceRange}
                onChange={(newRange) => setPriceRange(newRange)}
                onAfterChange={handleAfterChange}
                trackStyle={{
                  backgroundColor: process.env.NEXT_PUBLIC_ACCENT_COLOR_PRIMARY,
                }}
                handleStyle={[
                  { borderColor: process.env.NEXT_PUBLIC_ACCENT_COLOR_PRIMARY },
                  { borderColor: process.env.NEXT_PUBLIC_ACCENT_COLOR_PRIMARY },
                ]}
              />
            </label>
            <label className={styles.labelColumn}>
              <div className={styles.animatedLabel}>Animated</div>
              <div className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={isAnimated}
                  onChange={(e) => setIsAnimated(e.target.checked)}
                  className={styles.toggleInput}
                />
                <span className={styles.slider}></span>
              </div>
            </label>
          </form>
        </div>
      </div>
      <div style={{ margin: "50px 70px", fontSize: "1.5em" }}>
        {translations[language] && translations["en"]?.Explore ? (
          <div>{getTranslatedCategory(category, translations, language)}</div>
        ) : (
          <div></div>
        )}
      </div>
      <div className={styles.gridWrapper}>
        {data.map((item) => (
          <div
            key={item.id}
            className={styles.gridItem}
            onClick={() => handleCardClick(item.id)}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={`/api/image/${item.preview[0]}`}
              className={styles.itemImage}
            />
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemPrice}>{item.price}$</span>
            </div>
            {hoveredItemId === item.id && (
              <div className={styles.hoverContainer}>
                {item.extension.map((ext, index) => (
                  <div key={index} className={styles.extensionItem}>
                    {ext}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Explore() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExploreContent />
    </Suspense>
  );
}

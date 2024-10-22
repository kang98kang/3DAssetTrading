"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./explorepage.module.css";

function ExploreContent() {
  const category = [
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

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [unselectedCategory, setUnselectedCategory] = useState([...category]);

  const handleSelectFilter = (filterName) => {
    setSelectedCategory((prev) => [...prev, filterName]);
    setUnselectedCategory((prev) =>
      prev.filter((filter) => filter !== filterName)
    );
  };

  const handleDeselectFilter = (filterName) => {
    setSelectedCategory((prev) =>
      prev.filter((filter) => filter !== filterName)
    );
    setUnselectedCategory((prev) => {
      const updatedCategory = [...prev, filterName];
      return updatedCategory.sort(
        (a, b) => category.indexOf(a) - category.indexOf(b)
      );
    });
  };

  const getItemVariants = (filterName, isSelected) => {
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

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isAnimated, setIsAnimated] = useState(false);
  const [data, setData] = useState([]);

  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";

  const fetchData = (requestData) => {
    fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    const requestData = {
      name,
      program: selectedCategory,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      isAnimated,
    };
    fetchData(requestData);
  }, [name, selectedCategory, isAnimated]);

  const handleAfterChange = (newRange) => {
    const requestData = {
      name,
      program: selectedCategory,
      priceMin: newRange[0],
      priceMax: newRange[1],
      isAnimated,
    };
    fetchData(requestData);
  };

  return (
    <div className={styles.paperback}>
      <div className={styles.divisionline}></div>
      <div className={styles.nav}>
        <motion.div
          style={{ width: "100%", display: "flex", flexWrap: "nowrap" }}
          initial="hidden"
          animate="visible"
        >
          {selectedCategory.map((filterName) => (
            <motion.div
              key={filterName}
              className={styles.inner}
              onClick={() => handleDeselectFilter(filterName)}
              layout="position"
              variants={getItemVariants(filterName, true)}
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

          {unselectedCategory.map((filterName) => (
            <motion.div
              key={filterName}
              className={styles.inner}
              onClick={() => handleSelectFilter(filterName)}
              layout="position"
              variants={getItemVariants(filterName, false)}
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
        <div style={{ borderLeft: "2px solid white" }}>
          <form className={styles.filterForm}>
            <label
              style={{ flex: "1", display: "flex", flexDirection: "column" }}
            >
              <div
                style={{
                  fontSize: "1.2rem",
                  marginTop: "-20px",
                }}
              >
                Price
              </div>
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
            <label
              style={{
                width: "200px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ fontSize: "1.2rem", marginTop: "-10px" }}>
                Animated
              </div>
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
      <div className={styles.gridWrapper}>
        {data.map((item) => (
          <div key={item.id} className={styles.gridItem}>
            <img src={item.preview} className={styles.itemImage} />
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>{item.file}</span>
              <span className={styles.itemPrice}>{item.price}$</span>
            </div>
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

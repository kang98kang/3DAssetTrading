"use client";

import { Suspense, useState } from "react";
import { motion } from "framer-motion";
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

  return (
    <div className={styles.paperback}>
      <div className={styles.divisionline}></div>
      <div className={styles.nav}>
        <motion.div
          style={{ width: "100%", display: "flex", flexWrap: "wrap" }}
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

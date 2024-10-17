"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./explorepage.module.css";

function ExploreContent() {
  const searchParams = useSearchParams();
  const category = [
    "Autodesk FBX",
    "3ds Max",
    "Blender",
    "OBJ wavefront",
    "Cinema 4D",
    "Maya",
    "LightWave",
    "Modo",
    "SketchUp",
    "Stereolithography",
    "Unity",
    "Unreal",
    "Collada",
    "Polygon File Format",
  ];
  const subFilterUrl = searchParams.get("filter");
  const subFilters = [
    "hair",
    "vehicle",
    "compact",
    "mid-size",
    "large",
    "clothing",
    "top",
    "bottom",
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  };

  // const listShiftVariants = {
  //   hidden: { x: -50 },
  //   visible: { x: 0 },
  //   exit: { x: 50 },
  // };

  // 인덱스가 0이거나 선택한 아이템일 경우 애니메이션을 비활성화
  const shouldDisableShiftAnimation = (filterName, index) => {
    return index === 0 || selectedCategory.includes(filterName);
  };

  // 선택 해제 시 본래 인덱스와 현재 인덱스가 일치하는 경우 애니메이션 비활성화
  const shouldDisableDeselectAnimation = (filterName, index) => {
    const originalIndex = category.indexOf(filterName);
    return originalIndex === index;
  };

  return (
    <div className={styles.paperback}>
      <div className={styles.divisionline}></div>
      <div className={styles.nav}>
        <motion.div
          style={{ width: "100%", display: "flex", overflow: "hidden" }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {selectedCategory.map((filterName, index) => (
              <motion.div
                key={filterName}
                className={styles.inner}
                onClick={() => handleDeselectFilter(filterName)}
                layout
                // 선택 해제 시 본래 인덱스와 현재 인덱스가 일치할 경우 애니메이션 비활성화
                variants={
                  shouldDisableDeselectAnimation(filterName, index)
                    ? {}
                    : itemVariants
                }
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <div className={`${styles.filter} ${styles.icon}`}></div>
                <div className={`${styles.filter} ${styles.selected}`}>
                  {filterName}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <AnimatePresence>
            {unselectedCategory.map((filterName, index) => (
              <motion.div
                key={filterName}
                className={styles.inner}
                onClick={() => handleSelectFilter(filterName)}
                layout
                // 인덱스가 0이거나 선택한 아이템일 경우 listShiftVariants 적용 안 함
                variants="variants"
                whileHover={{ color: "#ff6347" }}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <div className={`${styles.filter} ${styles.icon}`}></div>
                <div className={styles.filter}>{filterName}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flex: 1 }}>
          {subFilters.map((filterName, index) => (
            <div
              key={index}
              className={styles.filter}
              style={{ color: subFilterUrl === filterName ? "red" : "black" }}
            >
              {filterName}
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: "#84a9a6", flex: 1 }}></div>
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

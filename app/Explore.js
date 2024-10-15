"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Header.module.css";

const dropdownVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
    transition: {
      delay: 0.05,
    },
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.4,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { x: -10, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { opacity: { duration: 0.1 } },
  },
};

const submenuVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      when: "beforeChildren",
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

export default function Explore() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleSubmenu = (item) => {
    setActiveSubmenu(activeSubmenu === item ? null : item);
  };

  return (
    <div
      className={styles.explore}
      onMouseEnter={toggleDropdown}
      onMouseLeave={toggleDropdown}
    >
      Explore
      <motion.div
        className={styles.dropdown}
        initial="hidden"
        animate={isDropdownVisible ? "visible" : "hidden"}
        variants={dropdownVariants}
      >
        <motion.ul>
          <motion.li variants={itemVariants}>머리카락</motion.li>
          <motion.li
            variants={itemVariants}
            onMouseEnter={() => toggleSubmenu("car")}
            onMouseLeave={() => toggleSubmenu(null)}
          >
            차량
            {activeSubmenu === "car" && (
              <motion.ul
                className={styles.submenu}
                initial="hidden"
                animate="visible"
                variants={submenuVariants}
              >
                <motion.li variants={itemVariants}>소형</motion.li>
                <motion.li variants={itemVariants}>중형</motion.li>
                <motion.li variants={itemVariants}>대형</motion.li>
              </motion.ul>
            )}
          </motion.li>
          <motion.li
            variants={itemVariants}
            onMouseEnter={() => toggleSubmenu("clothes")}
            onMouseLeave={() => toggleSubmenu(null)}
          >
            옷
            {activeSubmenu === "clothes" && (
              <motion.ul
                className={styles.submenu}
                initial="hidden"
                animate="visible"
                variants={submenuVariants}
              >
                <motion.li variants={itemVariants}>상의</motion.li>
                <motion.li variants={itemVariants}>하의</motion.li>
              </motion.ul>
            )}
          </motion.li>
        </motion.ul>
      </motion.div>
    </div>
  );
}

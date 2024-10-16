"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleSubmenu = (item) => {
    setActiveSubmenu(activeSubmenu === item ? null : item);
  };

  const handleFilterClick = (filter) => {
    router.push(`/explore?filter=${filter}`);
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
          <motion.li
            variants={itemVariants}
            onClick={() => handleFilterClick("hair")}
          >
            머리카락
          </motion.li>
          <motion.li
            variants={itemVariants}
            onMouseEnter={() => toggleSubmenu("vehicle")}
            onMouseLeave={() => toggleSubmenu(null)}
          >
            차량
            {activeSubmenu === "vehicle" && (
              <motion.ul
                className={styles.submenu}
                initial="hidden"
                animate="visible"
                variants={submenuVariants}
              >
                <motion.li
                  variants={itemVariants}
                  onClick={() => handleFilterClick("compact")}
                >
                  소형
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  onClick={() => handleFilterClick("mid-size")}
                >
                  중형
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  onClick={() => handleFilterClick("large")}
                >
                  대형
                </motion.li>
              </motion.ul>
            )}
          </motion.li>
          <motion.li
            variants={itemVariants}
            onMouseEnter={() => toggleSubmenu("clothing")}
            onMouseLeave={() => toggleSubmenu(null)}
          >
            옷
            {activeSubmenu === "clothing" && (
              <motion.ul
                className={styles.submenu}
                initial="hidden"
                animate="visible"
                variants={submenuVariants}
              >
                <motion.li
                  variants={itemVariants}
                  onClick={() => handleFilterClick("top")}
                >
                  상의
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  onClick={() => handleFilterClick("bottom")}
                >
                  하의
                </motion.li>
              </motion.ul>
            )}
          </motion.li>
        </motion.ul>
      </motion.div>
    </div>
  );
}

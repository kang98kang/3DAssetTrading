"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from "../app/Header.module.css";

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
  const language = useSelector((state) => state.language.language);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    fetch("/language.json")
      .then((response) => response.json())
      .then((data) => setTranslations(data));
  }, []);

  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleSubmenu = (item) => {
    setActiveSubmenu(activeSubmenu === item ? null : item);
  };

  const handleFilterClick = (filter) => {
    if (filter) {
      router.push(`/explore?filter=${filter}`);
    } else router.push("/explore");
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
            onClick={() => handleFilterClick()}
          >
            {translations[language]?.Explore[0]}
          </motion.li>
          <motion.li
            variants={itemVariants}
            onClick={() => handleFilterClick("hair")}
          >
            {translations[language]?.Explore[1]}
          </motion.li>
          <motion.li
            variants={itemVariants}
            onMouseEnter={() => toggleSubmenu("vehicle")}
            onMouseLeave={() => toggleSubmenu(null)}
            onClick={() => handleFilterClick("vehicle")}
          >
            {translations[language]?.Explore[2]}
            {activeSubmenu === "vehicle" && (
              <motion.ul
                className={styles.submenu}
                initial="hidden"
                animate="visible"
                variants={submenuVariants}
              >
                <motion.li
                  variants={itemVariants}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilterClick("compact");
                  }}
                >
                  {translations[language]?.Explore[3]}
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilterClick("mid-size");
                  }}
                >
                  {translations[language]?.Explore[4]}
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilterClick("large");
                  }}
                >
                  {translations[language]?.Explore[5]}
                </motion.li>
              </motion.ul>
            )}
          </motion.li>
          <motion.li
            variants={itemVariants}
            onMouseEnter={() => toggleSubmenu("clothing")}
            onMouseLeave={() => toggleSubmenu(null)}
            onClick={() => handleFilterClick("clothing")}
          >
            {translations[language]?.Explore[6]}
            {activeSubmenu === "clothing" && (
              <motion.ul
                className={styles.submenu}
                initial="hidden"
                animate="visible"
                variants={submenuVariants}
              >
                <motion.li
                  variants={itemVariants}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilterClick("top");
                  }}
                >
                  {translations[language]?.Explore[7]}
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilterClick("bottom");
                  }}
                >
                  {translations[language]?.Explore[8]}
                </motion.li>
              </motion.ul>
            )}
          </motion.li>
        </motion.ul>
      </motion.div>
    </div>
  );
}

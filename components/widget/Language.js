"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setLanguage } from "../../app/store/languageSlice";
import styles from "../../app/Header.module.css";

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

export default function Language() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);
  const [translations, setTranslations] = useState({});
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    fetch("/language.json")
      .then((response) => response.json())
      .then((data) => setTranslations(data));
  }, []);

  const handleLanguageChange = (lang) => {
    dispatch(setLanguage(lang));
  };

  return (
    <div
      className={styles.explore}
      onMouseEnter={toggleDropdown}
      onMouseLeave={toggleDropdown}
    >
      {language}
      <motion.div
        className={styles.dropdown}
        initial="hidden"
        animate={isDropdownVisible ? "visible" : "hidden"}
        variants={dropdownVariants}
      >
        <motion.ul>
          <motion.li
            variants={itemVariants}
            onClick={() => handleLanguageChange("ko")}
          >
            한국어
          </motion.li>
          <motion.li
            variants={itemVariants}
            onClick={() => handleLanguageChange("en")}
          >
            English
          </motion.li>
        </motion.ul>
      </motion.div>
    </div>
  );
}

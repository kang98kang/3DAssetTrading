"use client";

import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import styles from "./Button.module.css";

const Button = ({
  width,
  height,
  backgroundColor = "blue",
  label,
  onClick,
  fontSize,
}) => {
  const language = useSelector((state) => state.language.language);

  const buttonClass =
    language === "ko"
      ? `${styles.button} ${styles["buttonKo"]}`
      : styles.button;
  return (
    <motion.button
      className={buttonClass}
      style={{ backgroundColor, width, height }}
      onClick={onClick}
      whileHover={{ scale: 1.1, backgroundColor: " #84a9a6 ", color: "black" }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {label}
    </motion.button>
  );
};

export default Button;

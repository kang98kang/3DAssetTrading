"use client";

import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import styles from "./Button.module.css";

const Button = ({
  width,
  height,
  backgroundColor = process.env.NEXT_PUBLIC_BACKGROUND_COLOR_SECONDARY,
  label,
  iconSrc,
  onClick = () => alert("Button TEST!"),
  fontSize = "1em",
}) => {
  const language = useSelector((state) => state.language.language);

  const buttonClass =
    language === "ko"
      ? `${styles.button} ${styles["buttonKo"]}`
      : styles.button;
  return (
    <motion.button
      className={buttonClass}
      style={{ backgroundColor, width, height, fontSize }}
      onClick={onClick}
      whileHover={{
        scale: 1.1,
        backgroundColor: process.env.NEXT_PUBLIC_ACCENT_COLOR_PRIMARY,
        color: process.env.NEXT_PUBLIC_TEXT_COLOR_SECONDARY,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {iconSrc && <img src={iconSrc} alt="Icon" className={styles.icon} />}
      {label}
    </motion.button>
  );
};

export default Button;

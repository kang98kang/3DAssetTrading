"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Button.module.css";

const Button = ({
  width,
  height,
  backgroundColor = "blue",
  label,
  onClick,
}) => {
  return (
    <motion.button
      className={styles.button}
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

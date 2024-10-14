"use client";

import React from "react";
import styles from "./Button.module.css";

const Button = ({ backgroundColor = "blue", label, onClick }) => {
  return (
    <button
      className={styles.button}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;

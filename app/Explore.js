"use client";

import { useState } from "react";
import styles from "./Header.module.css";

export default function Explore() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <div
        className={styles.explore}
        onMouseEnter={toggleDropdown}
        onMouseLeave={toggleDropdown}
      >
        Explore
        {isDropdownVisible && (
          <ul className={styles.dropdown}>
            <li>Extension</li>
            <li>Rendering</li>
            <li>Modeling</li>
            <li>Price</li>
            <li>Animated</li>
          </ul>
        )}
      </div>
    </>
  );
}

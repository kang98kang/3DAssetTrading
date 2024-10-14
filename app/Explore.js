"use client"; // 상태 관리 때문에 클라이언트 컴포넌트로 유지

import { useState } from "react";
import styles from "./Header.module.css";

export default function Explore() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <div className={styles.explore} onMouseEnter={toggleDropdown}>
        Explore
      </div>
      {isDropdownVisible && (
        <ul className={styles.dropdown}>
          <li>Extension</li>
          <li>Rendering</li>
          <li>Modeling</li>
          <li>Price</li>
          <li>Animated</li>
        </ul>
      )}
    </>
  );
}

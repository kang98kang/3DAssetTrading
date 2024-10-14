"use client";

import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>Logo</div>
          <div className={`${styles.logo} ${styles.name}`}>Name</div>
          <div className={styles.explore} onMouseEnter={toggleDropdown}>
            Explore🔽
          </div>
        </div>
        <input type="text" placeholder="SearchBar" className={styles.nav} />
        <div className={styles.loginContainer}>
          <div className={styles.login}>Login</div>
          <div className={styles.login}>Signin</div>
        </div>
        {/* {isDropdownVisible && (
          <ul className={styles.dropdown}>
            <li>Extension</li>
            <li>Rendering</li>
            <li>Modeling</li>
            <li>Price</li>
            <li>Animated</li>
          </ul>
        )} */}
      </div>
    </>
  );
}

"use client";

import styles from "./Header.module.css";
import Explore from "./Explore";
import Button from "../components/common/Button";

export default function Header() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>Logo</div>
          <div className={`${styles.logo} ${styles.name}`}>Name</div>
          <Explore />
        </div>
        <input type="text" placeholder="SearchBar" className={styles.nav} />
        <div className={styles.loginContainer}>
          <Button
            backgroundColor="#2b2b2b"
            width="55px"
            height="34px"
            label="Login"
            onClick={() => alert("Login Button TEST!")}
          />
          <Button
            backgroundColor="#2b2b2b"
            width="60px"
            height="34px"
            label="Signin"
            onClick={() => alert("SignIn Button TEST!")}
          />
        </div>
      </div>
    </>
  );
}

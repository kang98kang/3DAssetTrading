"use client";

import { useRouter } from "next/navigation";
import styles from "./Header.module.css";
import Explore from "./Explore";
import Button from "../components/common/Button";

export default function Header() {
  const router = useRouter();
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <div
            style={{ cursor: "pointer" }}
            className={styles.logo}
            onClick={() => {
              router.push("/");
            }}
          >
            logo
          </div>
          <div
            className={`${styles.logo} ${styles.name}`}
            onClick={() => {
              router.push("/");
            }}
          >
            Name
          </div>
          <Explore />
        </div>
        <input type="text" className={styles.nav} />
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

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import styles from "./Header.module.css";
import Explore from "./Explore";
import Language from "./Language";
import Button from "../components/common/Button";

export default function Header() {
  const language = useSelector((state) => state.language.language);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    fetch("/language.json")
      .then((response) => response.json())
      .then((data) => setTranslations(data));
  }, []);

  const router = useRouter();

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <div
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
        <Language />
        <div className={styles.loginContainer}>
          <Button
            backgroundColor="#2b2b2b"
            width="70px"
            height="34px"
            label={translations[language]?.Login[0]}
            onClick={() => alert("Login Button TEST!")}
          />
          <Button
            backgroundColor="#2b2b2b"
            width="75px"
            height="34px"
            label={translations[language]?.Login[2]}
            onClick={() => alert("SignIn Button TEST!")}
          />
        </div>
      </div>
    </>
  );
}

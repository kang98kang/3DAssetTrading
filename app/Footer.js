"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "./Footer.module.css";

export default function Footer() {
  const language = useSelector((state) => state.language.language);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    fetch("/language.json")
      .then((response) => response.json())
      .then((data) => setTranslations(data));
  }, []);

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerInfo}>
        <p>{translations[language]?.Footer[0]}</p>
        <p>{translations[language]?.Footer[1]}</p>
        <p className={styles.right}>© MonsteraTech. ALL RIGHTS RESERVED.</p>
      </div>
      <div className={styles.iconContainer}>
        <a
          href="https://pf.kakao.com/_cpxopG"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/icons/kakao-talk.png"
            alt="KakaoTalk"
            className={styles.icon}
            width={40}
            height={40}
          />
        </a>
        <a
          href="https://www.instagram.com/monlab_official/?next=%2F"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/icons/instagram.png"
            alt="Instagram"
            className={styles.icon}
            width={40}
            height={40}
          />
        </a>
        <a
          href="https://www.youtube.com/@MonsteraLab"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/icons/youtube.png"
            alt="YouTube"
            className={styles.icon}
            width={40}
            height={40}
          />
        </a>
      </div>
    </footer>
  );
}

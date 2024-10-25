"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguageData } from "../../components/hook/useLanguageData";
import Image from "next/image";
import styles from "./loginpage.module.css";
import Button from "@/components/common/Button";

export default function Login() {
  const router = useRouter();
  const handleRoute = (route) => {
    router.push(`/${route}`);
  };

  const { language, translations } = useLanguageData();
  return (
    <div className={styles.mainContainer}>
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{translations[language]?.Login[0]}</h1>
          {/* <Image
            src="/icons/discord.png"
            alt="Discord"
            className={styles.icon}
            width={5}
            height={5}
          /> */}
          <Button
            width="360px"
            height="42px"
            label={translations[language]?.Login[3]}
            iconSrc="/icons/discord.png"
          />
          <div onClick={() => handleRoute("/")}>
            {translations[language]?.Main[4]}
          </div>
        </div>
      </section>
    </div>
  );
}

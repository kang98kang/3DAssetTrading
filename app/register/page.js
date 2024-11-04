"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useLanguageData } from "../../components/hook/useLanguageData";
import Button from "@/components/common/Button";
import styles from "./registerpage.module.css";

export default function Login() {
  const router = useRouter();
  const handleRoute = (route) => {
    router.push(`/${route}`);
  };

  const handleRegister = async (provider) => {
    await signIn(provider);
  };

  const { language, translations } = useLanguageData();

  useEffect(() => {
    const alertFlag = document.cookie
      .split("; ")
      .find((row) => row.startsWith("alert="))
      ?.split("=")[1];

    if (alertFlag) {
      alert(translations[language]?.Login[13]);

      document.cookie =
        "alert=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }, [language, translations]);

  return (
    <div className={styles.mainContainer}>
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{translations[language]?.Login[2]}</h1>
          <Button
            onClick={() => handleRegister("discord")}
            width="360px"
            height="42px"
            label={translations[language]?.Login[4]}
            iconSrc="/icons/discord.png"
          />
          <Button
            onClick={() => handleRegister("google")}
            width="360px"
            height="42px"
            label={translations[language]?.Login[12]}
            iconSrc="/icons/google.png"
          />
          <div>
            <div style={{ cursor: "pointer" }} onClick={() => handleRoute("")}>
              {translations[language]?.Main[3]}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

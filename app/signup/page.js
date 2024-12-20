"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useLanguageData } from "../../components/hook/useLanguageData";
import Button from "@/components/common/Button";
import styles from "./signuppage.module.css";

export default function Login() {
  const router = useRouter();
  const handleRoute = (route) => {
    router.push(`/${route}`);
  };

  const handleSignup = async (provider) => {
    await signIn(provider);
  };

  const { language, translations } = useLanguageData();

  return (
    <div className={styles.mainContainer}>
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{translations[language]?.Login[2]}</h1>
          <Button
            onClick={() => handleSignup("discord")}
            width="360px"
            height="42px"
            label={translations[language]?.Login[4]}
            iconSrc="/icons/discord.png"
          />
          <Button
            onClick={() => handleSignup("google")}
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

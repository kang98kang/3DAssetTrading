"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useLanguageData } from "../../components/hook/useLanguageData";
import Image from "next/image";
import styles from "./loginpage.module.css";
import Button from "@/components/common/Button";

export default function Login() {
  const router = useRouter();
  const handleRoute = (route) => {
    router.push(`/${route}`);
  };

  const handleSignIn = () => {
    signIn("discord");
  };

  const { language, translations } = useLanguageData();
  return (
    <div className={styles.mainContainer}>
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{translations[language]?.Login[0]}</h1>
          <Button
            onClick={handleSignIn}
            width="360px"
            height="42px"
            label={translations[language]?.Login[3]}
            iconSrc="/icons/discord.png"
          />
          <div>
            <div
              style={{
                marginBottom: "5px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => handleRoute("register")}
            >
              회원가입 하기
            </div>
            <div style={{ cursor: "pointer" }} onClick={() => handleRoute("")}>
              {translations[language]?.Main[4]}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

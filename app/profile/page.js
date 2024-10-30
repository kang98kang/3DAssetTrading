"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import { useLanguageData } from "../../components/hook/useLanguageData";
import Button from "@/components/common/Button";
import styles from "./profilepage.module.css";

export default function Profile() {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const { language, translations } = useLanguageData();

  const handleRoute = (route) => {
    router.push(`/${route}`);
  };

  const handleSignIn = async (provider) => {
    await signIn(provider, null, { prompt: "none" });
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className={styles.mainContainer}>
      <section className={styles.profileSection}>
        <div className={styles.card}>
          <h1 className={styles.title}>{translations[language]?.Login[6]}</h1>
          {user ? (
            <div className={styles.userInfo}>
              <img
                src={user.image}
                alt="User Avatar"
                className={styles.avatar}
              />
              <h2 className={styles.name}>{user.name}</h2>
              <p className={styles.email}>{user.email}</p>
              <div className={styles.linkContainer}>
                <Button
                  onClick={() => handleRoute("cart")}
                  width="250px"
                  height="40px"
                  label={translations[language]?.Detail[1]}
                />
                <Button
                  onClick={() => handleSignOut()}
                  width="250px"
                  height="40px"
                  label={translations[language]?.Login[1]}
                />
              </div>
            </div>
          ) : (
            <Button
              onClick={() => handleSignIn("discord")}
              width="300px"
              height="42px"
              label={translations[language]?.Login[2]}
              iconSrc="/icons/discord.png"
            />
          )}
        </div>
      </section>
    </div>
  );
}

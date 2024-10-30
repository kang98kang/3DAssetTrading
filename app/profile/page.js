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

  const handleLogIn = async (provider) => {
    await signIn(provider, null, { prompt: "none" });
  };

  const handleLogOut = async () => {
    await signOut();
  };

  const handleSignOut = async () => {
    if (
      confirm("서비스 탈퇴를 진행하시겠습니까? 이 작업은 돌이킬 수 없습니다.")
    ) {
      const response = await fetch("/api/user/delete", { method: "DELETE" });
      if (response.ok) {
        alert("탈퇴가 완료되었습니다.");
        window.location.href = "/";
      } else {
        alert("탈퇴에 실패했습니다. 오류가 반복되면 문의해 주세요.");
      }
    }
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
                  height="42px"
                  label={translations[language]?.Detail[1]}
                />
                <Button
                  onClick={handleLogOut}
                  width="250px"
                  height="42px"
                  label={translations[language]?.Login[1]}
                />
                <Button
                  onClick={handleSignOut}
                  width="250px"
                  height="42px"
                  label={translations[language]?.Login[5]}
                />
              </div>
            </div>
          ) : (
            <Button
              onClick={() => handleLogIn("discord")}
              width="360px"
              height="42px"
              label={translations[language]?.Login[3]}
              iconSrc="/icons/discord.png"
            />
          )}
        </div>
      </section>
    </div>
  );
}

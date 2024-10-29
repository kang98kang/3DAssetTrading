"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLanguageData } from "../components/hook/useLanguageData.js";
import Button from "../components/common/Button";
import styles from "./mainpage.module.css";

import { useAuth } from "../components/hook/useAuth.js";
import { useSelector } from "react-redux";

const EyeModel = dynamic(() => import("../components/widget/Eye.js"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const handleRoute = (route) => {
    router.push(`/${route}`);
  };

  const { signIn, signOut } = useAuth();
  const user = useSelector((state) => state.auth.user);

  const { language, translations } = useLanguageData();

  return (
    <motion.div
      className={styles.dummy}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.mainContainer}>
        <div className={styles.textSection}>
          <h1>{translations[language]?.Main[0]}</h1>
          {user ? (
            <>
              <h1>Welcome, {user.name}</h1>
            </>
          ) : (
            <Button
              onClick={async () => {
                await signIn("discord");
              }}
              width="360px"
              height="42px"
              label="Login"
              iconSrc="/icons/discord.png"
            />
          )}
          <p>{translations[language]?.Main[1]}</p>
          <div className={styles.buttonGroup}>
            <Button
              width="auto"
              height="34px"
              label={translations[language]?.Main[2]}
              onClick={() => handleRoute("explore")}
            />

            <Button
              width="auto"
              height="34px"
              label="장바구니페이지로 이동"
              onClick={() => handleRoute("cart")}
            />
          </div>
        </div>
        <div className={styles.modelSection}>
          <EyeModel />
        </div>
      </div>
    </motion.div>
  );
}

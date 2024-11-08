"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLanguageData } from "../components/hook/useLanguageData.js";
import Button from "../components/common/Button";
import styles from "./mainpage.module.css";
import { useAuth } from "../components/hook/useAuth.js";
import { useSelector } from "react-redux";

const EarthModel = dynamic(() => import("../components/widget/Earth.js"), {
  ssr: false,
});

const RocketModel = dynamic(() => import("../components/widget/Rocket.js"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const handleRoute = (route) => {
    router.push(`/${route}`);
  };

  useAuth();
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
        {/* 지구 모델과 텍스트 영역 */}
        <div className={styles.textSection}>
          {user ? (
            <>
              <h1>
                {translations[language]?.Main[0]}, {user.name}{" "}
                {language === "ko" ? "님" : " "}
              </h1>
            </>
          ) : (
            <h1>{translations[language]?.Main[0]}</h1>
          )}
          <p>{translations[language]?.Main[1]}</p>
          <div className={styles.buttonGroup}>
            <Button
              width="auto"
              height="34px"
              label={translations[language]?.Main[2]}
              onClick={() =>
                (window.location.href = "https://monsteratech.com/contact")
              }
            />
          </div>
        </div>
        <div className={styles.modelSection}>
          <EarthModel />
        </div>
      </div>

      <motion.div
        className={styles.rocketContainer}
        initial={{ x: "-20vw", y: "50vh" }}
        animate={{ x: "100vw" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        }}
      >
        <RocketModel direction="right" />
      </motion.div>
    </motion.div>
  );
}

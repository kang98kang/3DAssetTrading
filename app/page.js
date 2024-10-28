"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLanguageData } from "../components/hook/useLanguageData.js";
import Button from "../components/common/Button";
import styles from "./mainpage.module.css";
import SignIn from "@/components/widget/Signin.js";

const EyeModel = dynamic(() => import("../components/widget/Eye.js"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const handleRoute = (route) => {
    router.push(`/${route}`);
  };

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
            <SignIn />
          </div>
        </div>
        <div className={styles.modelSection}>
          <EyeModel />
        </div>
      </div>
    </motion.div>
  );
}

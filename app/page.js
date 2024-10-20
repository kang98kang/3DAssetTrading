"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import styles from "./mainpage.module.css";
import Button from "../components/common/Button";

const EyeModel = dynamic(() => import("../components/Models/Eye"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const handleRoute = (route) => {
    router.push(`/${route}`);
  };

  const language = useSelector((state) => state.language.language);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    fetch("/language.json")
      .then((response) => response.json())
      .then((data) => setTranslations(data));
  }, []);

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
              backgroundColor="#2b2b2b"
              width="auto"
              height="34px"
              label="Go to explorepage"
              onClick={() => handleRoute("explore")}
            />

            <Button
              backgroundColor="#2b2b2b"
              width="auto"
              height="34px"
              label="Go to detailpage"
              onClick={() => handleRoute("detail")}
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

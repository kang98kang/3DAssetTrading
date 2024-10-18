"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
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
          <h1>메인페이지 테스트</h1>
          <p>
            Manage your 3D assets. Distribute 3D & AR experiences. Collaborate
            with others. Showcase your work. Buy & sell 3D models.
          </p>
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

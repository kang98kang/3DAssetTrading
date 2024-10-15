"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./mainpage.module.css";
import Button from "../components/common/Button";

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
      <p>dummy main body :)</p>
      <br />
      <p style={{ color: "green" }}>Button Test</p>
      <div style={{ display: "flex", gap: 20 }}>
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
    </motion.div>
  );
}

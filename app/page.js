"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./mainpage.module.css";
import Button from "../components/common/Button";

export default function Home() {
  const router = useRouter();

  const handleDetail = () => {
    router.push("/detail");
  };

  return (
    <motion.div
      className={styles.dummy}
      initial={{ opacity: 0 }} // 처음에 투명
      animate={{ opacity: 1 }} // 나타날 때 완전히 보이게
      exit={{ opacity: 0 }} // 사라질 때 다시 투명해짐
      transition={{ duration: 0.5 }} // 0.5초 동안 애니메이션
    >
      <p>dummy main body :)</p>
      <br />
      <p style={{ color: "green" }}>Button Test</p>
      <div style={{ display: "flex", gap: 20 }}>
        <Button
          backgroundColor="#2b2b2b"
          width="auto"
          height="34px"
          label="Go to detailpage"
          onClick={handleDetail}
        />
      </div>
    </motion.div>
  );
}

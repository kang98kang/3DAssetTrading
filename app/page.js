"use client";

import styles from "./mainpage.module.css";
import Button from "../components/common/button";

export default function Home() {
  return (
    <div className={styles.dummy}>
      <p>dummy main body :)</p>
      <br />
      <p style={{ color: "green" }}>Button Test</p>
      <div style={{ display: "flex", gap: 20 }}>
        <Button
          backgroundColor="red"
          label="Red"
          onClick={() => alert("RED TEST!")}
        />
        <Button
          backgroundColor="green"
          label="Green"
          onClick={() => alert("Green TEST!")}
        />
        <Button
          backgroundColor="blue"
          label="Blue"
          onClick={() => alert("Blue TEST!")}
        />
      </div>
    </div>
  );
}

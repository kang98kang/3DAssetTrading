import styles from "./explorepage.module.css";

export default function Explore() {
  return (
    <div className={styles.dummy}>
      <div className={styles.divisionline}></div>
      <div className={styles.nav}>
        <div className={styles.filter1}>EXTENSION</div>
        <div className={styles.filter2}>RENDERING</div>
        <div className={styles.filter3}>MODELING</div>
        <div className={styles.filter4}>PRICE</div>
        <div className={styles.filter5}>ANIMATION</div>
      </div>
    </div>
  );
}

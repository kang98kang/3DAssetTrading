import styles from "./explorepage.module.css";

export default function Explore() {
  const filters = ["EXTENSION", "RENDERING", "MODELING", "PRICE", "ANIMATION"];
  return (
    <div className={styles.dummy}>
      <div className={styles.divisionline}></div>
      <div className={styles.nav}>
        {filters.map((filter, index) => (
          <div key={index} className={styles.filter}>
            {filter}
          </div>
        ))}
      </div>
      <div style={{ backgroundColor: "red" }}>red</div>
    </div>
  );
}

import styles from "./Header.module.css";
import Explore from "./Explore";

export default function Header() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>Logo</div>
          <div className={`${styles.logo} ${styles.name}`}>Name</div>
          <Explore />
        </div>
        <input type="text" placeholder="SearchBar" className={styles.nav} />
        <div className={styles.loginContainer}>
          <div className={styles.login}>Login</div>
          <div className={styles.login}>Signin</div>
        </div>
      </div>
    </>
  );
}

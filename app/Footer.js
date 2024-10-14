import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerInfo}>
        <p>주식회사 몬스테라텍</p>
        <p>
          764-88-02769 / 서울특별시 강남구 학동로 161, 건일빌딩 3층, 4층 /{" "}
          <a href="hj.kwon@monsteraedu.co.kr">hj.kwon@monsteraedu.co.kr</a>
        </p>
        <p className={styles.right}>© MonsteraTech. ALL RIGHTS RESERVED.</p>
      </div>
      <div className={styles.iconContainer}>
        <a href="https://kakao.com" target="_blank" rel="noopener noreferrer">
          <Image
            src="/icons/kakao-talk.png"
            alt="KakaoTalk"
            className={styles.icon}
            width={40}
            height={40}
          />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/icons/instagram.png"
            alt="Instagram"
            className={styles.icon}
            width={40}
            height={40}
          />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <Image
            src="/icons/youtube.png"
            alt="YouTube"
            className={styles.icon}
            width={40}
            height={40}
          />
        </a>
      </div>
    </footer>
  );
}

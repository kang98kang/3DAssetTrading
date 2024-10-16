import Image from "next/image";
import styles from "./Footer.module.css";
import * as fs from "fs";
import path from "path";

export default function Footer() {
  // const dir = path.join(__dirname, "/public/language.json");
  // const textFile = fs.readFileSync(dir, "utf8");
  // console.log(dir);

  // console.log(textFile);
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerInfo}>
        <p>주식회사 몬스테라텍</p>
        <p>
          764-88-02769 / 서울특별시 강남구 학동로 161, 건일빌딩 3층, 4층 /
          hj.kwon@monsteraedu.co.kr
        </p>
        <p className={styles.right}>© MonsteraTech. ALL RIGHTS RESERVED.</p>
      </div>
      <div className={styles.iconContainer}>
        <a
          href="https://pf.kakao.com/_cpxopG"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/icons/kakao-talk.png"
            alt="KakaoTalk"
            className={styles.icon}
            width={40}
            height={40}
          />
        </a>
        <a
          href="https://www.instagram.com/monlab_official/?next=%2F"
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
        <a
          href="https://www.youtube.com/@MonsteraLab"
          target="_blank"
          rel="noopener noreferrer"
        >
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

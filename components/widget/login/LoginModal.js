import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useLanguageData } from "../../hook/useLanguageData";
import Button from "../../common/Button";
import styles from "./LoginModal.module.css";

export default function LoginModal({ onClose }) {
  const router = useRouter();

  const handleSignIn = async (provider) => {
    await signIn(provider, null, { prompt: "none" });
  };

  const { language, translations } = useLanguageData();

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <h1 className={styles.title}>{translations[language]?.Login[0]}</h1>
        <Button
          onClick={() => handleSignIn("discord")}
          width="360px"
          height="42px"
          label={translations[language]?.Login[3]}
          iconSrc="/icons/discord.png"
        />
        <div className={styles.registerPrompt}>
          <div
            onClick={() => {
              onClose();
              router.push("/register");
            }}
          >
            {translations[language]?.Login[2]}
          </div>
        </div>
      </div>
    </div>
  );
}

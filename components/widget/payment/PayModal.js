import { useLanguageData } from "../../hook/useLanguageData";
import { PayPalButton } from "./Paypal";
import styles from "./PayModal.module.css";

export default function PayModal({ onClose, amount, onSuccess }) {
  const { language, translations } = useLanguageData();

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <h1 className={styles.title}>{translations[language]?.Detail[8]}</h1>
        <div style={{ width: "360px" }}>
          <PayPalButton amount={amount} onSuccess={onSuccess} />
        </div>
      </div>
    </div>
  );
}

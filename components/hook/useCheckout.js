import { useState } from "react";
import { useSession } from "next-auth/react";
import { useLanguageData } from "../hook/useLanguageData";

export default function useCheckout() {
  const { data: session } = useSession();
  const { language, translations } = useLanguageData();
  const [isPayModalOpen, setPayModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const openPayModal = () => setPayModalOpen(true);
  const closePayModal = () => setPayModalOpen(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const handleCheckout = () => {
    if (session) {
      openPayModal();
    } else {
      alert(translations[language]?.Login[10]);
      openLoginModal();
    }
  };

  return {
    isPayModalOpen,
    isLoginModalOpen,
    openPayModal,
    closePayModal,
    openLoginModal,
    closeLoginModal,
    handleCheckout,
  };
}

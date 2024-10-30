import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLanguageData } from "../../hook/useLanguageData";
import Button from "../../common/Button";
import Dropdown from "../../common/Dropdown";
import LoginModal from "./LoginModal";
import styles from "../../../app/Header.module.css";

export default function IsLoggedIn() {
  const { language, translations } = useLanguageData();
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const dropdownItems = [
    { label: translations[language]?.Login[6], value: "profile" },
    { label: translations[language]?.Detail[1], value: "cart" },
    { label: translations[language]?.Login[1], value: "logout" },
  ];

  const handleCategoryClick = async (route) => {
    if (route === "logout") {
      signOut();
    } else {
      router.push(`/${route}`);
    }
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <div className={styles.loginContainer}>
      {session ? (
        <div className={styles.profileContainer}>
          <Dropdown
            title={
              <img
                src={session.user.image || "/icons/default-profile.png"}
                alt="Profile"
                className={styles.profileImage}
                onClick={() => router.push("/profile")}
              />
            }
            items={dropdownItems}
            onItemClick={handleCategoryClick}
            translations={translations}
            language={language}
            alignRight
            isLoggedIn
          />
        </div>
      ) : (
        <>
          <Button
            onClick={openLoginModal}
            width="70px"
            height="34px"
            label={translations[language]?.Login[0]}
          />
          <Button
            onClick={() => {
              setLoginModalOpen(false);
              router.push("/register");
            }}
            width="75px"
            height="34px"
            label={translations[language]?.Login[2]}
          />
        </>
      )}
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
    </div>
  );
}

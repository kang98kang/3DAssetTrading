import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useLanguageData } from "../hook/useLanguageData";
import Button from "../common/Button";
import Dropdown from "../common/Dropdown";
import styles from "../../app/Header.module.css";

export default function IsLoggedIn() {
  const { language, translations } = useLanguageData();

  const router = useRouter();

  const { data: session } = useSession();

  const dropdownItems = [
    { label: translations[language]?.Login[6], value: "profile" },
    { label: translations[language]?.Detail[1], value: "cart" },
    { label: translations[language]?.Login[1], value: "logout" },
    { label: translations[language]?.Login[5], value: "signout" },
  ];

  const handleCategoryClick = (route) => {
    if (route !== "logout") {
      router.push(`/${route}`);
    } else signOut();
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
            onClick={() => {
              router.push("/login");
            }}
            width="70px"
            height="34px"
            label={translations[language]?.Login[0]}
          />
          <Button
            onClick={() => {
              router.push("/register");
            }}
            width="75px"
            height="34px"
            label={translations[language]?.Login[2]}
          />
        </>
      )}
    </div>
  );
}

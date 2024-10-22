"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import styles from "./Header.module.css";
import Explore from "../components/Explore";
import Language from "./Language";
import Button from "../components/common/Button";

export default function Header() {
  const language = useSelector((state) => state.language.language);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    fetch("/language.json")
      .then((response) => response.json())
      .then((data) => setTranslations(data));
  }, []);

  const router = useRouter();
  const pathname = usePathname();
  const isExplorePage = pathname === "/explore";

  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (!isExplorePage) {
      setSearchTerm("");
    }
  }, [isExplorePage]);

  const searchParams = useSearchParams();

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <div
            className={styles.logo}
            style={{
              backgroundImage: "url(/images/logo.png)",
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
            onClick={() => {
              router.push("/");
            }}
          ></div>
          <div
            className={`${styles.logo} ${styles.name}`}
            style={{
              backgroundImage: "url(/images/name.png)",
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
            onClick={() => {
              router.push("/");
            }}
          ></div>
          <Explore />
        </div>
        {isExplorePage ? (
          <div className={styles.navContainer}>
            <img
              src="/icons/search.png"
              alt="Search Icon"
              className={styles.searchIcon}
            />
            <input
              type="text"
              className={styles.searchBar}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  let path = `/explore?name=${encodeURIComponent(searchTerm)}`;
                  if (searchParams.get("filter")) {
                    path = `/explore?filter=${searchParams.get(
                      "filter"
                    )}&name=${encodeURIComponent(searchTerm)}`;
                  }
                  router.push(path);
                }
              }}
            ></input>
          </div>
        ) : (
          <div
            className={styles.navContainer}
            onClick={() => router.push("/explore")}
          >
            <img
              src="/icons/search.png"
              alt="Search Icon"
              className={styles.searchIcon}
            />
          </div>
        )}
        <Language />
        <div className={styles.loginContainer}>
          <Button
            width="70px"
            height="34px"
            label={translations[language]?.Login[0]}
          />
          <Button
            width="75px"
            height="34px"
            label={translations[language]?.Login[2]}
          />
        </div>
      </div>
    </>
  );
}

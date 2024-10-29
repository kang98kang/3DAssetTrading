"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../app/store/languageSlice";
import Dropdown from "../common/Dropdown";

export default function Language() {
  // 언어 설정
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    fetch("/language.json")
      .then((response) => response.json())
      .then((data) => setTranslations(data));
  }, []);

  const handleLanguageChange = (lang) => {
    dispatch(setLanguage(lang));
  };

  // 드롭다운
  const dropdownItems = [
    { label: "한국어", value: "ko" },
    { label: "English", value: "en" },
  ];

  return (
    <Dropdown
      title={language}
      items={dropdownItems}
      onItemClick={handleLanguageChange}
    />
  );
}

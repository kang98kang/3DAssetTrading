"use client";

import { useLanguageData } from "../../components/hook/useLanguageData";

export default function ErrorPage() {
  const { language, translations } = useLanguageData();
  alert(translations[language]?.Login[13]);
  window.location.href = "/";

  return null;
}

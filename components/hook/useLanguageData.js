import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import translationsData from "../../public/language.json";

export function useLanguageData() {
  const language = useSelector((state) => state.language.language);
  const [translations, setTranslations] = useState(translationsData);

  return { language, translations };
}

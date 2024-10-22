import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export function useLanguageData() {
  const language = useSelector((state) => state.language.language);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    fetch("/language.json")
      .then((response) => response.json())
      .then((data) => setTranslations(data));
  }, []);

  return { language, translations };
}

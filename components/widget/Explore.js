"use client";

import { useRouter } from "next/navigation";
import { useLanguageData } from "../hook/useLanguageData";
import Dropdown from "../common/Dropdown";

export default function Explore() {
  const { language, translations } = useLanguageData();

  const router = useRouter();

  const handleCategoryClick = (category) => {
    if (category) {
      router.push(`/explore?category=${category}`);
    } else router.push("/explore");
  };

  const dropdownItems = [
    { label: translations[language]?.Explore[0], value: null },
    { label: translations[language]?.Explore[1], value: "hair" },
    {
      label: translations[language]?.Explore[2],
      value: "vehicle",
      submenu: [
        { label: translations[language]?.Explore[3], value: "compact" },
        { label: translations[language]?.Explore[4], value: "mid-size" },
        { label: translations[language]?.Explore[5], value: "large" },
      ],
    },
    {
      label: translations[language]?.Explore[6],
      value: "clothing",
      submenu: [
        { label: translations[language]?.Explore[7], value: "top" },
        { label: translations[language]?.Explore[8], value: "bottom" },
      ],
    },
  ];

  return (
    <Dropdown
      title="Explore"
      items={dropdownItems}
      onItemClick={handleCategoryClick}
      translations={translations}
      language={language}
      withSubmenu={true}
    />
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import styles from "./explorepage.module.css";

export default function Explore() {
  const searchParams = useSearchParams();
  const filters = ["EXTENSION", "RENDERING", "MODELING", "PRICE", "ANIMATION"];
  const subFilterUrl = searchParams.get("filter");
  const subFilters = [
    "hair",
    "vehicle",
    "compact",
    "mid-size",
    "large",
    "clothing",
    "top",
    "bottom",
  ];

  return (
    <div className={styles.dummy}>
      <div className={styles.divisionline}></div>
      <div className={styles.nav}>
        <div style={{ width: "50%", display: "flex" }}>
          {filters.map((filterName, index) => (
            <div key={index} className={styles.filter}>
              {filterName}
              <div className={styles.dropdown}>
                {subFilters.map((subFilter, subIndex) => (
                  <div key={subIndex} className={styles.dropdownItem}>
                    {subFilter}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ backgroundColor: "red", flex: 1 }}>red</div>
        <div style={{ display: "flex", flex: 1 }}>
          {subFilters.map((filterName, index) => (
            <div
              key={index}
              className={styles.filter}
              style={{ color: "black" }}
            >
              {filterName} {subFilterUrl === filterName ? "(선택됨)" : ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

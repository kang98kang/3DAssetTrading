"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";
import styles from "../../app/Header.module.css";

const dropdownVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
    transition: {
      delay: 0.05,
    },
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.4,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { x: -10, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { opacity: { duration: 0.1 } },
  },
};

const submenuVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      when: "beforeChildren",
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

export default function Dropdown({
  title,
  items,
  onItemClick,
  translations,
  language,
  withSubmenu = false,
  alignRight = false,
  isLoggedIn = false,
}) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleSubmenu = (item) => {
    setActiveSubmenu(activeSubmenu === item ? null : item);
  };

  return (
    <div
      className={classNames(styles.explore, { [styles.noAfter]: isLoggedIn })}
      onMouseEnter={toggleDropdown}
      onMouseLeave={toggleDropdown}
    >
      {title}
      <motion.div
        className={classNames(styles.dropdown, {
          [styles.alignRight]: alignRight,
        })}
        initial="hidden"
        animate={isDropdownVisible ? "visible" : "hidden"}
        variants={dropdownVariants}
      >
        <motion.ul>
          {items.map((item, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              onClick={() => onItemClick(item.value)}
              onMouseEnter={() => withSubmenu && toggleSubmenu(item.value)}
              onMouseLeave={() => withSubmenu && toggleSubmenu(null)}
            >
              {item.label ||
                translations[language]?.Explore[index] ||
                "Unnamed"}
              {withSubmenu && activeSubmenu === item.value && item.submenu && (
                <motion.ul
                  className={styles.submenu}
                  initial="hidden"
                  animate="visible"
                  variants={submenuVariants}
                >
                  {item.submenu.map((subItem, subIndex) => (
                    <motion.li
                      key={subIndex}
                      variants={itemVariants}
                      onClick={(e) => {
                        e.stopPropagation();
                        onItemClick(subItem.value);
                      }}
                    >
                      {subItem.label ||
                        translations[language]?.Explore[index] ||
                        "Unnamed"}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}

'use client';

import styles from "@/styles/scss/other/texts/NavbarText.module.scss";
import React from "react";
import navbarSelectStore from "@/stores/navbarSelectStore";

interface NavbarTextProps {
  title: string;
  icon: React.ReactNode;
  index: number;
}

const NavbarText = ({ title, icon, index }: NavbarTextProps) => {
  const { selectedIndex, setSelectedIndex } = navbarSelectStore();

  return (
      <div className={styles.navbarText}>
        <div className={styles.hoverAnimation} style={{ opacity: index === selectedIndex ? 1 : 0 }} />
        <div className={styles.textIconWrap}>
          <div className={styles.navbarIcon} onClick={() => setSelectedIndex(index)}>{icon}</div>
          <h2 className={styles.navbarTitle}>{title}</h2>
        </div>
      </div>
  )
}

export default NavbarText;

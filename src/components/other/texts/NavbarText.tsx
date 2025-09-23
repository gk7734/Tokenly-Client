import styles from "@/styles/scss/other/texts/NavbarText.module.scss";
import React from "react";
import {IoHome} from "react-icons/io5";

interface NavbarTextProps {
  title: string;
  icon: React.ReactNode;
}

const NavbarText = ({ title, icon }: NavbarTextProps) => {
  return (
      <div className={styles.navbarText}>
        <div className={styles.hoverAnimation} />
        <div className={styles.textIconWrap}>
          <IoHome className={styles.navbarIcon} size={24} color={'#fbfbfb'} />
          <h2 className={styles.navbarTitle}>Test</h2>
        </div>
      </div>
  )
}

export default NavbarText;

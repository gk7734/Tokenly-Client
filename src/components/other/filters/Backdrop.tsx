import styles from "@/styles/scss/other/filters/Backdrop.module.scss";
import React from "react";

interface BackdropProps {
  isOpen: boolean;
  toggle?: () => void;
  children?: React.ReactNode;
}

const Backdrop = ({ isOpen, toggle, children }: BackdropProps) => {
  return (
      <>
        {isOpen && (
            <div className={styles.backdrop} onClick={toggle}>
              {children}
            </div>
        )}
      </>
  )
}

export default Backdrop;

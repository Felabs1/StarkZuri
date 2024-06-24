import React from "react";
import styles from "./ModalContainer.module.css";

const ModalContainer = ({ children, closeModal }) => {
  return (
    <div className={styles.modal_background}>
      <div className={styles.modal_container}>
        <div className={styles.titleCloseButton}>
          <button onClick={() => closeModal(false)}>x</button>
        </div>

        <div className={styles.body}>{children}</div>
        <div className={styles.footer}>
          <button className={styles.cancel} onClick={() => closeModal(false)}>
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;

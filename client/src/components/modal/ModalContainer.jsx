import React from "react";
import styles from "./ModalContainer.module.css";

const ModalContainer = ({ children, closeModal }) => {
  return (
    <div className={styles.modal_background}>
      <div className={styles.modal_container}>
        <button onClick={() => closeModal(false)}>x</button>
        <div className={styles.title}>
          <h1>comments</h1>
        </div>
        <div className={styles.body}>
          <p>we are going to remove this once we are done designing.</p>
        </div>
        <div className={styles.footer}>
          <button className={styles.cancel} onClick={() => closeModal(false)}>
            cancel
          </button>
          <button className={styles.continue}>continue</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;

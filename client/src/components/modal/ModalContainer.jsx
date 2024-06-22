import React from "react";
import styles from "./ModalContainer.module.css";

const ModalContainer = ({ children }) => {
  return (
    <div className={`w3-modal ${styles.modal_container}`}>
      <div className={`w3-modal-content w3-white ${styles.modal_content}`}>
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;

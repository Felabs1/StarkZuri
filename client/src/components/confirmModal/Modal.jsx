import React from "react";
import styles from "./ConfirmModal.module.css";

const Modal = ({ children }) => {
  return (
    <div>
      <div className={`w3-modal w3-show ${styles.modal}`}>
        <div
          className={`w3-modal-content w3-card-4 w3-right ${styles.modal_content} w3-round-large`}
        >
          <div className="w3-panel">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

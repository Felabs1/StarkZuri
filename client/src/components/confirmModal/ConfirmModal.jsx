import React from "react";
import styles from "./ConfirmModal.module.css";

const ConfirmModal = ({ message, onButtonClick, onCancelClick, heading }) => {
  return (
    <div className={`w3-modal w3-show ${styles.modal}`}>
      <div
        className={`w3-modal-content w3-card-4 w3-right ${styles.modal_content} w3-round-large`}
      >
        <div className="w3-panel">
          <h4>{heading}</h4>
          <p>{message}</p>
          <div className="w3-center w3-padding">
            <button
              className="w3-button w3-round w3-blue"
              onClick={onButtonClick}
            >
              Ok
            </button>
            &nbsp;
            <button
              className="w3-button w3-round w3-red"
              onClick={onCancelClick}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

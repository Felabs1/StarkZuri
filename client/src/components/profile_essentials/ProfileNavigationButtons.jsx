import React from "react";
import styles from "./ProfileNavigationButtons.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCoins } from "@fortawesome/free-solid-svg-icons";

const ProfileNavigationButtons = ({ onModalOpen }) => {
  return (
    <div className={`w3-bar ${styles.profile_button_container}`}>
      <button
        className={`w3-bar-item ${styles.profile_navigation_buttons}`}
        onClick={onModalOpen}
      >
        <FontAwesomeIcon icon={faEdit} />
        &nbsp; edit
      </button>
      <button className={`w3-bar-item ${styles.profile_navigation_buttons}`}>
        <FontAwesomeIcon icon={faCoins} />
        &nbsp; Buy
      </button>
    </div>
  );
};

export default ProfileNavigationButtons;

import React from "react";
import styles from "./ProfileNavigationButtons.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCoins,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

const ProfileNavigationButtons = ({ onModalOpen, onSellZuriModalOpen }) => {
  return (
    <div className={`w3-bar ${styles.profile_button_container}`}>
      <button
        className={`w3-bar-item w3-border w3-border-white w3-round-large ${styles.profile_navigation_buttons}`}
        onClick={onModalOpen}
      >
        <FontAwesomeIcon icon={faEdit} />
        &nbsp; Register Profile
      </button>
      <button className={`w3-bar-item ${styles.profile_navigation_buttons}`}>
        <FontAwesomeIcon icon={faCoins} />
        &nbsp; Buy Zuri Points
      </button>
      <button
        onClick={onSellZuriModalOpen}
        className={`w3-bar-item ${styles.profile_navigation_buttons}`}
      >
        <FontAwesomeIcon icon={faMoneyBill} />
        &nbsp; Sell Zuri Points
      </button>
    </div>
  );
};

export default ProfileNavigationButtons;

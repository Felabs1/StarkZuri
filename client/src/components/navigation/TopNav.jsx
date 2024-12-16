import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faNavicon } from "@fortawesome/free-solid-svg-icons";
import { connect, disconnect } from "starknetkit";
import styles from "./TopNav.module.css";
import Logo from "../../assets/logo.png";
import { useAppContext } from "../../providers/AppProvider";
import ConfirmModal from "../confirmModal/ConfirmModal";

const TopNav = ({ onMobileMenuClick }) => {
  const [confirm, setConfirm] = useState(false);
  const cancelLogout = () => {
    setConfirm(false);
  };

  const logout = () => {
    handleWalletDisconnection();
    window.location.reload();
  };

  const showConfirm = () => {
    setConfirm(true);
  };
  // const [navOpen, setNavOpen] = useState(false);
  const { address, handleWalletConnection, handleWalletDisconnection } =
    useAppContext();

  return (
    <div className={`w3-bar ${styles.top_nav} w3-padding`}>
      {confirm && (
        <ConfirmModal
          message="are you sure you want to log out?"
          heading="log out?"
          onCancelClick={cancelLogout}
          onButtonClick={logout}
        />
      )}
      <button
        className={`${styles.mobile_nav_button} w3-hide-large w3-hide-medium w3-bar-item`}
        onClick={onMobileMenuClick}
      >
        <FontAwesomeIcon className="w3-text-white" icon={faNavicon} />
      </button>
      <span>
        <img src={Logo} className={styles.logo} />
      </span>

      <div className="w3-right">
        <div className={styles.right_objects}>
          <div className={styles.search_input}>
            <FontAwesomeIcon
              className={`${styles.search_font} w3-text-white w3-padding`}
              icon={faSearch}
            />
            <input
              className={`w3-input ${styles.search_input} w3-text-white`}
              placeholder="search"
            />
          </div>

          <button
            className={`w3-button ${styles.connect_button}`}
            onClick={address ? showConfirm : handleWalletConnection}
          >
            {address ? "connected" : "connect wallet"}
          </button>
        </div>
      </div>
      {/* <FontAwesomeIcon icon={faCoffee} /> */}
    </div>
  );
};

export default TopNav;

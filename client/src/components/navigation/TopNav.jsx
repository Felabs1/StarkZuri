import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { connect, disconnect } from "starknetkit";
import styles from "./TopNav.module.css";
import Logo from "../../assets/logo.png";

const TopNav = () => {
  const connectWallet = async () => {
    const { wallet } = await connect();

    if (wallet && wallet.isConnected) {
      setConnection(wallet);
      setProvider(wallet.account);
      setAddress(wallet.selectedAddress);
    }
  };
  return (
    <div className={`w3-bar ${styles.top_nav} w3-padding`}>
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
            onClick={connectWallet}
          >
            Connect wallet
          </button>
        </div>
      </div>
      {/* <FontAwesomeIcon icon={faCoffee} /> */}
    </div>
  );
};

export default TopNav;

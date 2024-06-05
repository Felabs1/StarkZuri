import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { connect, disconnect } from "starknetkit";
import "./TopNav.css";
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
    <div class="w3-bar top-nav w3-padding">
      <span>
        <img src={Logo} className="logo" />
      </span>

      <div className="w3-right">
        <div className="right-objects">
          <div className="search-input">
            <FontAwesomeIcon
              className="search-font w3-text-white w3-padding"
              icon={faSearch}
            />
            <input
              className="w3-input search-input w3-text-white"
              placeholder="search"
            />
          </div>

          <button className="w3-button connect-button" onClick={connectWallet}>
            Connect wallet
          </button>
        </div>
      </div>
      {/* <FontAwesomeIcon icon={faCoffee} /> */}
    </div>
  );
};

export default TopNav;

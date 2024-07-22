import React from "react";
import styles from "./ConnectWallet.module.css";
import { useAppContext } from "../../providers/AppProvider";

const ConnectWallet = () => {
  const { handleWalletConnection } = useAppContext();
  return (
    <div className={`w3-center`}>
      <h1 className={styles.heading}>Please Connect Wallet</h1>
      <p className={styles.message}>
        You need to connect your wallet to continue to this module
      </p>
      <br />
      <br />
      <button className={styles.login_button} onClick={handleWalletConnection}>
        Connect Wallet
      </button>
    </div>
  );
};

export default ConnectWallet;

// network

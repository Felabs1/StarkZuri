import React from "react";
import styles from "./Transactions.module.css";

const Transactions = () => {
  return (
    <div className={styles.transaction_container}>
      <div className="w3-bar">
        <span className="w3-bar-item w3-large">Last Transactions</span>
        <div className="w3-right">
          <span className="w3-bar-item w3-text-white">View All</span>
        </div>
      </div>
    </div>
  );
};

export default Transactions;

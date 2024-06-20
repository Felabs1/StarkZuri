import React from "react";
import styles from "./Transactions.module.css";
import TransactionList from "./TransactionList";

const Transactions = () => {
  return (
    <div className={styles.transaction_container}>
      <div className="w3-bar">
        <span className="w3-bar-item w3-large">Last Transactions</span>
        <div className="w3-right">
          <span className="w3-bar-item w3-text-white">View All</span>
        </div>
      </div>
      <h6 className={styles.day_heading}>today</h6>
      <TransactionList />
      <TransactionList />
      <TransactionList />
      <TransactionList />

      <h6 className={styles.day_heading}>Yesterday</h6>
    </div>
  );
};

export default Transactions;

import React from "react";
import styles from "./Transactions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";

const TransactionList = () => {
  return (
    <div className={styles.transaction_list}>
      <div className={styles.transaction_icon_and_description}>
        <div className={styles.icon_image}>
          <FontAwesomeIcon icon={faArrowCircleDown} />
        </div>
        <div className={styles.icon_description}>
          <span className={styles.transaction_type}>Incoming</span>
          <br />
          <span className={styles.transaction_destination}>from @felabs</span>
        </div>
      </div>
      <div className={styles.transaction_amount_and_value}>
        <span className={styles.transaction_amount}>+6,536 USDT</span>
        <br />
        <span className={styles.transaction_value}>$ 6,356</span>
      </div>
    </div>
  );
};

export default TransactionList;

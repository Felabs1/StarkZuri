import React from "react";
import styles from "./MyAssets.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoinSign, faMoneyBills } from "@fortawesome/free-solid-svg-icons";

const AssetList = () => {
  return (
    <div className={styles.asset_list}>
      <div className={styles.asset_icon_and_description}>
        <div className={styles.asset_icon}>
          <FontAwesomeIcon icon={faBitcoinSign} />
        </div>
        <div className={styles.asset_description}>
          <span>Smart Chain BNB</span>
        </div>
      </div>
      <div className={styles.asset_amount_and_value}>
        <span className={styles.asset_amount}>0.02335 Matic</span>
        <br />
        <span className={styles.asset_value}>$ 34.46</span>
      </div>
    </div>
  );
};

export default AssetList;

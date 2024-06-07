import React from "react";
import styles from "./AssetsCard.module.css";

const AssetsCard = () => {
  return (
    <>
      <div className={styles.asset_card}>
        <table className={`${styles.table}`}>
          <tr>
            <td className={styles.key}>$zuri Price</td>
            <td className={`${styles.value} w3-right-align`}>$0.45</td>
          </tr>
          <tr>
            <td className={styles.key}>your $Zuri</td>
            <td className={`${styles.value} w3-right-align`}>
              2000 &#x3d; $900
            </td>
          </tr>
        </table>
      </div>
      <br />
      <div className={styles.asset_card}>
        <table className={`${styles.table}`}>
          <tr>
            <td className={styles.key}>Total Earnings</td>
            <td className={`${styles.value} w3-right-align`}>&#x3d; $0.000</td>
          </tr>
          <tr>
            <td className={styles.key}>Diamonds</td>
            <td className={`${styles.value} w3-right-align`}>&#x3d; $0.000</td>
          </tr>
          <tr>
            <td className={styles.key}>NFT Earnings</td>
            <td className={`${styles.value} w3-right-align`}>&#x3d; $0.000</td>
          </tr>
          <tr>
            <td className={styles.key}>Creator Coins</td>
            <td className={`${styles.value} w3-right-align`}>&#x3d; $0.000</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default AssetsCard;

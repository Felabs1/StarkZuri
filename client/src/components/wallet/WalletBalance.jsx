import React from "react";
import styles from "./WalletBalance.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faArrowTrendUp,
  faPaperPlane,
  faMoneyBillTransfer,
  faArrowCircleDown,
  faArrowDown,
  faHandHoldingDollar,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";

const WalletBalance = () => {
  return (
    <div className={styles.wallet_balance}>
      <h4>
        Wallet Balance &nbsp;
        <FontAwesomeIcon icon={faEye} />
      </h4>
      <div className={styles.balance_and_controls}>
        <div className={styles.total_balance}>
          <h1>
            $ 13,280.<small>25</small>
          </h1>
          <button type="disabled" className={styles.percentage}>
            <FontAwesomeIcon className="w3-text-green" icon={faArrowTrendUp} />
            &nbsp; 8.82%
          </button>
          <button className={styles.increment}>+251.5</button>
        </div>
        <div className={styles.balance_controls}>
          <div>
            <button>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
            send
          </div>
          <div>
            <button>
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
            receive
          </div>
          <div>
            <button>
              <FontAwesomeIcon icon={faHandHoldingDollar} />
            </button>
            request
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;

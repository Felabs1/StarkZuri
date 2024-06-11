import React from "react";
import styles from "./Message.module.css";
const Message = ({ status, contactName, message, amount, time, image }) => {
  return (
    <div className={`w3-padding ${styles.message}`}>
      <div
        className={styles.profile}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className={styles.description}>
        <span className={styles.username}>{contactName}</span>
        <br />
        <small>{message}</small>
      </div>
      <div>
        <small>{time}</small>
        <br />
        <small className="w3-tag w3-round w3-blue">{amount}</small>
      </div>
    </div>
  );
};

export default Message;

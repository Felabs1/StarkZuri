import React from "react";
import styles from "./ChatBox.module.css";
const TextMessageComponent = ({ type }) => {
  return (
    <div className={type == "received" ? styles.single_chat : styles.received}>
      <div className={styles.chat_profile_pic}></div>
      <div className={styles.desc_and_message}>
        <div className={styles.description}>
          <span>Felabs</span>
          <small>12m ago</small>
        </div>
        <div
          className={
            type == "received" ? styles.message : styles.message_received
          }
        >
          I saw those shots... it think they are awesome... nice work
        </div>
      </div>
    </div>
  );
};

export default TextMessageComponent;

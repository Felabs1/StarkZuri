import React from "react";
import styles from "./ChatBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAudioDescription,
  faFileAudio,
  faMessage,
  faMicrophone,
  faPaperclip,
  faPhone,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import TextMessageComponent from "./TextMessageComponent";

const ChatBox = () => {
  return (
    <div className={styles.chatbox}>
      <div className={styles.chatbox_header}>
        <div className={styles.profile}>
          <div className={styles.profile_pic}></div>
          <div className={styles.profile_info}>
            <span className="w3-small">UI / Ux group</span>
            <br />
            <small>22 members . 2 online</small>
          </div>
        </div>
        <div className={styles.other_options}>
          <button className="w3-button">
            <FontAwesomeIcon icon={faPhone} />
          </button>
          <button className="w3-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className={styles.message_body}>
        <TextMessageComponent type="received" />
        <TextMessageComponent type="received" />
        <TextMessageComponent />
        <TextMessageComponent type="received" />
        <TextMessageComponent />

        <TextMessageComponent type="received" />
        <TextMessageComponent />
        <TextMessageComponent />
      </div>
      <br />
      <div className={styles.chat_form}>
        <button className="w3-button">
          <FontAwesomeIcon icon={faPaperclip} />
        </button>
        <input className="w3-input" />
        <button className="w3-button w3-border-right">
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
        <button className="w3-button">
          <FontAwesomeIcon icon={faMessage} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

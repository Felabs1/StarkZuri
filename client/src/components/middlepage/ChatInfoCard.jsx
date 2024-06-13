import React from "react";
import styles from "./ChatInfoCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const ChatInfoCard = () => {
  return (
    <div className={styles.chat_info_card}>
      <div className={styles.chat_info_header}>
        <div className={styles.chat_info_left}>
          <b>Group Info</b>
        </div>
        <div className={styles.chat_info_right}>
          <span>&times;</span>
        </div>
      </div>
      <hr className={styles.separator} />
      <div className={styles.profile_avatar_div}>
        <div className={styles.profile_avatar}></div>
        <br />
        <span>UI/UX Group</span>
      </div>
      <div className={styles.description}>
        <span className="w3-large">Description</span>
        <br />
        <br />
        <span className={styles.desc}>
          Lorem Ipsum Dolor sit amet consectetur eni lacret accumsan turpis
          voluptar nunceiptur
        </span>
      </div>
      <br />
      <div className={styles.invite_bar}>
        <span className={styles.invite_bar_header}>Invite others</span>
        <span className="w3-tag w3-blue w3-round">+</span>
      </div>
      <hr className={styles.separator} />
      <div className={styles.shared_media}>
        <div className={styles.shared_media_heading}>
          <span>
            <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
            &nbsp;shared media
          </span>

          <span>(273 media)</span>
        </div>
      </div>
      <div className={`w3-bar w3-round ${styles.media_navigation}`}>
        <a className="w3-bar-item">photos</a>
        <a className="w3-bar-item">videos</a>
        <a className="w3-bar-item">files</a>
        <a className="w3-bar-item">links</a>
      </div>
    </div>
  );
};

export default ChatInfoCard;

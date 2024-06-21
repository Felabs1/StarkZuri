import React from "react";
import styles from "./CommentContainer.module.css";
import profile1 from "../../assets/crystals.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListDots,
  faNavicon,
  faCommentDots,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import InnerThread from "./InnerThread";

const CommentContainer = ({ containsThread }) => {
  return (
    <div className={styles.comment_container}>
      <div className={styles.comment_header}>
        <div className={styles.commenter_profile_and_name}>
          <div
            className={styles.commenter_profile}
            style={{ backgroundImage: `url(${profile1})` }}
          ></div>
          <div className={styles.commenter_name}>
            <span>Felabs</span>&nbsp;
            <span className={styles.duration}>1 hour ago</span>
          </div>
        </div>

        <div className={styles.comment_menu}>
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
      </div>
      <div className={styles.comment_body}>
        <p>Love this huge fan of the low opacity tiles they added</p>
        {containsThread == true && <InnerThread />}
      </div>
      <div className={styles.comment_footer}>
        <button className={styles.react_button}>
          <FontAwesomeIcon icon={faSmile} />
        </button>
        <button className={styles.reply_button}>reply</button>
      </div>
    </div>
  );
};

export default CommentContainer;

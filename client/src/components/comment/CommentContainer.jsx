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

const CommentContainer = ({
  containsThread,
  username,
  profilePic,
  content,
  likes,
  postId,
  replies,
}) => {
  return (
    <div className={styles.comment_container}>
      <div className={styles.comment_header}>
        <div className={styles.commenter_profile_and_name}>
          <div
            className={styles.commenter_profile}
            style={{
              backgroundImage: `url(http://localhost:3000/${profilePic})`,
            }}
          ></div>
          <div className={styles.commenter_name}>
            <span>{username}</span>&nbsp;
            <span className={styles.duration}>1 hour ago</span>
          </div>
        </div>

        <div className={styles.comment_menu}>
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
      </div>
      <div className={styles.comment_body}>
        <p>{content && content}</p>
        {containsThread == true && <InnerThread />}
      </div>
      <div className={styles.comment_footer}>
        <button className={styles.react_button}>
          {likes && likes.toString()}
          <FontAwesomeIcon icon={faSmile} />
        </button>
        <button className={styles.reply_button}>reply</button>
      </div>
    </div>
  );
};

export default CommentContainer;

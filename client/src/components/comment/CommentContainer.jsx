import React from "react";
import styles from "./CommentContainer.module.css";

const CommentContainer = () => {
  return (
    <div className={styles.comment_container}>
      <div className={styles.comment_header}>
        <div className={styles.commenter_profile}></div>
        <div className={styles.commenter_name}></div>
        <div className={styles.comment_menu}></div>
      </div>
      <div className={styles.comment_body}>
        <p>Love this huge fan of the low opacity tiles they added</p>
      </div>
      <div className={styles.comment_footer}></div>
      CommentContainer
    </div>
  );
};

export default CommentContainer;

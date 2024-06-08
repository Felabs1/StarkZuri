import React from "react";
import styles from "./FollowersList.module.css";

const FollowersLIst = ({ profileImage, username, followText }) => {
  return (
    <div className={styles.followers_list}>
      <div className={styles.followers_details}>
        <div
          className={styles.profile_image}
          style={{ backgroundImage: `url(${profileImage})` }}
        ></div>
        <div className={styles.profile_username}>{username}</div>
      </div>
      <div className={styles.followers_button}>
        <button className="w3-button">{followText}</button>
      </div>
    </div>
  );
};

export default FollowersLIst;

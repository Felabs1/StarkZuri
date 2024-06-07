import React from "react";
import styles from "./ProfileCard.module.css";
import profilePic from "../../assets/profile_gradient.jpg";
import avatar from "../../assets/ST4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faG,
  faGlobeAfrica,
} from "@fortawesome/free-solid-svg-icons";

const ProfileCard = () => {
  return (
    <div className={`w3-padding ${styles.profile_card}`}>
      <div
        className={styles.profile_image}
        style={{ backgroundImage: `url(${profilePic})` }}
      ></div>
      <div
        className={`w3-center w3-border ${styles.profile_avatar}`}
        style={{ backgroundImage: `url(${avatar})` }}
      ></div>

      <div className={styles.followers_div}>
        <div className={styles.followers}>
          <b>45</b>
          <br />
          <small>Followers</small>
        </div>
        <div className={styles.followers}>
          <b>4,556</b>
          <br />
          <small>Following</small>
        </div>
      </div>
      <br />
      <div className={styles.avatar_description}>
        <span className={styles.profile_name}>@felabs</span>
        <br />
        <small>$0.0 coin Price</small>
        <br />
        <br />
        <span>
          the decentralized social media you are looking for is here...
        </span>
        <br />
        <br />
        <div className={styles.profile_more_info}>
          <small className="w3-text-blue">
            {" "}
            <FontAwesomeIcon icon={faGlobeAfrica} />
            &nbsp;stark-zuri.vercel.app
          </small>
          <small>
            <FontAwesomeIcon icon={faCalendar} />
            &nbsp; Joined June 2024
          </small>
        </div>
      </div>
      <br />
      <button className={`w3-button w3-block ${styles.postButton}`}>
        Post
      </button>
      <br />
    </div>
  );
};

export default ProfileCard;

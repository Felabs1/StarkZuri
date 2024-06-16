import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCoins,
  faCalendar,
  faGlobeAfrica,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./ProfileCardMiddle.module.css";
import profileGradient from "../../assets/profile_gradient.jpg";
import profile1 from "../../assets/profile1.jpg";

const ProfileCardMiddle = () => {
  return (
    <div className={styles.profile_outer_container}>
      <div
        className={styles.cover_photo}
        style={{ backgroundImage: `url(${profileGradient})` }}
      ></div>
      <div className={styles.profile_description_container}>
        <div
          className={styles.profile_image}
          style={{ backgroundImage: `url(${profile1})` }}
        ></div>
        <div className={styles.profile_text}>
          <span className={styles.profile_username}>Felabs</span>
          <small>
            <span className={styles.profile_amount}>$ 0.00 </span>coin price
          </small>
        </div>
      </div>
      <div className={styles.profile_following_container}>
        <div className={styles.following}>
          <span className={styles.follow_number}>37</span>
          <br />
          <span className={styles.follow_text}>followers</span>
        </div>
        <div className={styles.following}>
          <span className={styles.follow_number}>5,022</span>
          <br />

          <span>following</span>
        </div>
      </div>
      <div className={styles.about_description}>
        <div className={styles.about_description_text}>
          The L2 blockchain is the future of blockchains build on{" "}
          <span className="w3-text-blue">@starknet</span>
        </div>
        <div className={styles.about_navigation_buttons}>
          <button className={styles.edit_button}>
            <FontAwesomeIcon icon={faEdit} />
            &nbsp; edit
          </button>
          <button className={styles.buy_button}>
            <FontAwesomeIcon icon={faCoins} />
            &nbsp; buy
          </button>
        </div>
      </div>
      <div className={styles.profile_micro_links}>
        <div className={styles.left_link}>
          <a className="w3-text-blue">
            <FontAwesomeIcon icon={faGlobeAfrica} />
            &nbsp; felabs.com
          </a>
        </div>
        <div className={styles.right_link}>
          <span>
            <FontAwesomeIcon icon={faCalendar} />
            &nbsp; joined 6th June 2024
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardMiddle;

import React from "react";
import styles from "./PostCard.module.css";
import searchLogo from "../../assets/ST4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faImage,
  faVideo,
  faChartBar,
  faGlobe,
  faBucket,
} from "@fortawesome/free-solid-svg-icons";

const PostCard = () => {
  return (
    <div className={styles.postcard_border}>
      <div className={styles.form_container}>
        <img src={searchLogo} className={styles.logo_image} alt="image" />
        <input className="w3-input" placeholder="what's on your mind" />
        <button className="w3-button">Post</button>
      </div>
      <br />
      <div className={styles.form_helpers_holder}>
        <div
          className={styles.form_helpers}
          style={{ backgroundColor: "transparent" }}
        >
          {/* <FontAwesomeIcon icon={faSearch} /> */}
        </div>
        <div className={styles.form_helpers}>
          <FontAwesomeIcon icon={faImage} />
        </div>
        <div className={styles.form_helpers}>
          <FontAwesomeIcon icon={faVideo} />
        </div>
        <div className={styles.form_helpers}>
          <FontAwesomeIcon icon={faChartBar} />
        </div>
        <div className={styles.form_helpers}>
          <FontAwesomeIcon icon={faGlobe} />
        </div>{" "}
        <div className={styles.form_helpers}>
          <FontAwesomeIcon icon={faBucket} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;

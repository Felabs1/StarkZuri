import React from "react";
import styles from "./PopularCard.module.css";
import background from "../../assets/explore_image_2.jpg";
import profile_5 from "../../assets/profile5.jpg";
import crystals from "../../assets/crystals.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const PopularCard = () => {
  return (
    <div className={`w3-row-padding w3-stretch`}>
      {/* <div className={`w3-col l6`}>
        <div
          className={`${styles.popular_card}`}
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className={styles.background}></div>
          <div className={styles.description}>
            <div
              className={styles.triangle}
              style={{ backgroundImage: `url(${profile_5})` }}
            ></div>
            <h4>3D Art</h4>
            <p>A great place to discuss art</p>
            <br />
            <p className={styles.footer}>
              <FontAwesomeIcon icon={faUser} />
              &nbsp; 4,000 members
            </p>
          </div>
        </div>
      </div>
      <div className={`w3-col l6`}>
        <div
          className={`${styles.popular_card}`}
          style={{ backgroundImage: `url(${crystals})` }}
        >
          <div className={styles.background}></div>
          <div className={styles.description}>
            <div
              className={styles.triangle}
              style={{ backgroundImage: `url(${profile_5})` }}
            ></div>
            <h4>NFT</h4>
            <p>A great place to discuss art</p>
            <br />
            <p className={styles.footer}>
              <FontAwesomeIcon icon={faUser} />
              &nbsp; 4,004,889 members
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PopularCard;

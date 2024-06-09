import React from "react";
import styles from "./FeaturedCommunityCard.module.css";
import virtual_reality_image from "../../assets/virtual_reality.jpg";
import stark from "../../assets/ST4.png";
import computer_science from "../../assets/computer_science.jpg";
import profile_4 from "../../assets/profile3.jpg";

const FeaturedCommunityCard = () => {
  return (
    <div
      className={`${styles.featured_community_card} w3-row-padding w3-stretch`}
    >
      <div className="w3-col l6">
        <div
          className={` ${styles.community_card}`}
          style={{ backgroundImage: `url(${virtual_reality_image})` }}
        >
          <div className={styles.wave}>
            <div
              className={styles.profile_pic}
              style={{ backgroundImage: `url(${profile_4})` }}
            ></div>
            <h4>Virtual Reality</h4>
            <p>A community for novice and VR, Regular and friendly chat</p>
            <br />
            <div className={styles.footer}>
              <div className={styles.online}>2,000 online</div>

              <div className={styles.members}>2,234,567 Members</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w3-col l6">
        <div
          className={` ${styles.community_card}`}
          style={{ backgroundImage: `url(${computer_science})` }}
        >
          <div className={styles.wave}>
            <div
              className={styles.profile_pic}
              style={{ backgroundImage: `url(${stark})` }}
            ></div>
            <h4>Computer science</h4>
            <p>A community for novice and VR, Regular and friendly chat</p>
            <br />
            <div className={styles.footer}>
              <div className={styles.online}>890 online</div>

              <div className={styles.members}>234,567 Members</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCommunityCard;

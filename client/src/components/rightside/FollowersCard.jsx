import React from "react";
import styles from "./FollowersCard.module.css";
import profile1 from "../../assets/profile1.jpg";
import profile2 from "../../assets/profile2.jpg";
import profile3 from "../../assets/profile3.jpg";
import profile4 from "../../assets/profile5.jpg";
import FollowersLIst from "./FollowersLIst";

const FollowersCard = () => {
  return (
    <div className={styles.followers_card}>
      <div className={styles.followers_card_header}>
        <div className={styles.left_heading}>you will like</div>
        <div className={styles.right_heading}>view all</div>
      </div>
      <br />

      <FollowersLIst
        profileImage={profile1}
        username="james"
        followText="follow"
      />
      <FollowersLIst
        profileImage={profile2}
        username="charles"
        followText="follow back"
      />
      <FollowersLIst
        profileImage={profile3}
        username="jack"
        followText="follow"
      />
      <FollowersLIst
        profileImage={profile2}
        username="erick"
        followText="follow back"
      />
    </div>
  );
};

export default FollowersCard;

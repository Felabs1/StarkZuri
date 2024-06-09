import React from "react";
import styles from "./ExploreHeader.module.css";
import explore_head_image from "../../assets/explore_image_3.jpg";

const ExploreHeader = () => {
  return (
    <div
      className={`w3-panel ${styles.explore_header}`}
      style={{ backgroundImage: `url(${explore_head_image})` }}
    >
      <h1>What are you missing out on Stark Zuri?</h1>
    </div>
  );
};

export default ExploreHeader;

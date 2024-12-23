import React from "react";
import styles from "./ExploreHeader.module.css";
import explore_head_image from "../../assets/explore_image_3.jpg";

const ExploreHeader = ({
  heading,
  paragraph,
  backgroundImageUrl,
  datecreated,
}) => {
  return (
    <>
      <div
        className={`w3-panel ${styles.explore_header}`}
        style={{ backgroundImage: `url(${explore_head_image})` }}
      >
        <div className={`${styles.explore_description}`}>
          <h1>{heading}</h1>
        </div>
      </div>
      <div className="w3-center">
        <p>{paragraph}</p>
        <small>{datecreated}</small>
      </div>
    </>
  );
};

export default ExploreHeader;

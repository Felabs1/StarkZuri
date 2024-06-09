import React from "react";
import styles from "./ExploreSubHeader.module.css";

const ExploreSubHeader = ({ name }) => {
  return (
    <div className={styles.explore_sub_header}>
      <h3>{name}</h3>
      <a>see all</a>
    </div>
  );
};

export default ExploreSubHeader;

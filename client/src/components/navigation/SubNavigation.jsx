import React from "react";
import styles from "./SubNavigation.module.css";

const SubNavigation = () => {
  return (
    <div className={`${styles.side_navigations} w3-bar`}>
      <a className="w3-bar-item">Following</a>
      <a className="w3-bar-item">Hot</a>
      <a className="w3-bar-item">New</a>
      <a className="w3-bar-item">Explore</a>
    </div>
  );
};

export default SubNavigation;

import React from "react";
import styles from "./SubNavigation.module.css";

const SubNavigation = ({ borderData }) => {
  return (
    <div className={`${styles.side_navigations} w3-bar`}>
      {borderData.map(({ linkName }) => {
        return <a className="w3-bar-item">{linkName}</a>;
      })}
    </div>
  );
};

export default SubNavigation;

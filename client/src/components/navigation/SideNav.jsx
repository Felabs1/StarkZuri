import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./SideNav.module.css";
import { sideNavigations } from "../../utils/AppUtils";
const SideNav = () => {
  return (
    <div className={`w3-sidebar w3-text-white w3-bar-block ${styles.sidebar}`}>
      {sideNavigations.map(({ navName, icon }) => {
        return (
          <a className={`w3-bar-item w3-block ${styles.navname}`}>
            <FontAwesomeIcon
              className={`${styles.search_font} w3-text-white`}
              icon={icon}
            />
            {navName}
          </a>
        );
      })}
    </div>
  );
};

export default SideNav;

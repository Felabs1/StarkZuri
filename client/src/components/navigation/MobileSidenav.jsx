import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./MobileSidenav.module.css";
import { sideNavigations } from "../../utils/AppUtils";
import { Link } from "react-router-dom";

const MobileSidenav = () => {
  return (
    <div className={`w3-sidebar w3-bar-block ${styles.sidebar}`}>
      {sideNavigations.map(({ navName, icon, to }) => {
        return (
          <Link
            to={to}
            key={styles.navName}
            className={`w3-bar-item w3-block ${styles.navname}`}
          >
            <FontAwesomeIcon
              className={`${styles.search_font} w3-text-white`}
              icon={icon}
            />
            {navName}
          </Link>
        );
      })}
    </div>
  );
};

export default MobileSidenav;

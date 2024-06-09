import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import styles from "./SideNav.module.css";
import { sideNavigations } from "../../utils/AppUtils";
const SideNav = () => {
  return (
    <div className={`w3-sidebar w3-text-white w3-bar-block ${styles.sidebar}`}>
      {sideNavigations.map(({ navName, icon, to }) => {
        return (
          <Link to={to} className={`w3-bar-item w3-block ${styles.navname}`}>
            <FontAwesomeIcon
              className={`${styles.search_font} w3-text-white`}
              icon={icon}
            />
            {navName}
          </Link>
        );
      })}
      <br />
      <button className={`w3-button ${styles.post_button}`}>Post</button>
      <button className={`w3-button ${styles.blog_post_button}`}>
        Blog Post
      </button>
    </div>
  );
};

export default SideNav;

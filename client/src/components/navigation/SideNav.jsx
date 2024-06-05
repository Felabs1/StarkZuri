import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./SideNav.css";
import { sideNavigations } from "../../utils/AppUtils";
const SideNav = () => {
  return (
    <div className="w3-sidebar w3-bar-block sidebar">
      {sideNavigations.map(({ navName, icon }) => {
        return (
          <a className="w3-bar-item w3-block navname">
            <FontAwesomeIcon
              className="search-font w3-text-white"
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

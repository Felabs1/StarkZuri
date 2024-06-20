import React from "react";
import styles from "./MyAssets.module.css";
import AssetList from "./AssetList";

const MyAssets = () => {
  return (
    <div className={styles.my_assets_div}>
      <div className="w3-bar">
        <span className="w3-large w3-bar-item">My Assets</span>
        <div className="w3-right">
          <a className="w3-bar-item">View All</a>
        </div>
      </div>
      <div className={styles.asset_list_container}>
        <AssetList />
        <AssetList />
      </div>
    </div>
  );
};

export default MyAssets;

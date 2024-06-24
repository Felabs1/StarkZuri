import React from "react";
import styles from "./Skeleton.module.css";

const Skeleton = ({ width, height, variant }) => {
  const style = {
    width,
    height,
  };
  return <span className={`${styles.skeleton} ${variant}`}>Skeleton</span>;
};

export default Skeleton;

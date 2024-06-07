import React from "react";
import styles from "./FloatingButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faMailBulk,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

const FloatingButton = () => {
  return (
    <div
      className={`${styles.floating_container} w3-hide-medium w3-hide-large`}
    >
      <div className={styles.floating_button}>+</div>

      <div className={styles.element_container}>
        <span className={styles.float_element}>
          <FontAwesomeIcon icon={faMessage} />
        </span>

        <span className={styles.float_element}>
          <FontAwesomeIcon icon={faLeaf} />
        </span>
        <span className={styles.float_element}>
          <FontAwesomeIcon icon={faMailBulk} />
        </span>
      </div>
    </div>
  );
};

export default FloatingButton;

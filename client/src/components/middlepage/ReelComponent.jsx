import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faThumbsUp,
  faThumbsDown,
  faShare,
  faPause,
  faPlay,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./ReelComponent.module.css";
import media2 from "../../assets/media2.jpg";
import profile5 from "../../assets/profile5.jpg";

const ReelComponent = () => {
  const [playing, setPlaying] = useState(true);
  const handlePlayButtonClick = () => {
    setPlaying(!playing);
  };
  return (
    <div className={styles.reel_parent_component}>
      <div className={styles.reel_component}>
        <div
          className={styles.reel_video}
          style={{ backgroundImage: `url(${media2})` }}
        >
          <div className={styles.control_buttons}>
            <button onClick={handlePlayButtonClick}>
              <FontAwesomeIcon icon={playing ? faPlay : faPause} />
            </button>
            <button>
              <FontAwesomeIcon icon={faVolumeHigh} />
            </button>
          </div>
          <div className={styles.comment_area}>
            <div className={styles.poster_initials}>
              <div
                className={styles.profile_picture}
                style={{ backgroundImage: `url(${profile5})` }}
              ></div>
              <div className={styles.profile_username}>
                <span>@felabs</span>
              </div>
              <div>
                <button className={styles.profile_button}>follow</button>
              </div>
            </div>
            <div className={styles.poster_description}>
              <p>I almost got caught...</p>
            </div>
          </div>
        </div>
        <div className={styles.reel_buttons}>
          <div>
            <button>
              <FontAwesomeIcon icon={faMessage} className={styles.reel_icon} />
            </button>
            <small>2000</small>
            <button>
              <FontAwesomeIcon icon={faThumbsUp} className={styles.reel_icon} />
            </button>
            <small>Like</small>

            <button>
              <FontAwesomeIcon
                icon={faThumbsDown}
                className={styles.reel_icon}
              />
            </button>
            <small>dislike</small>

            <button>
              <FontAwesomeIcon icon={faShare} className={styles.reel_icon} />
            </button>
            <small className="w3-center">share</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelComponent;

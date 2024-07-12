import React, { useRef, useState, useEffect } from "react";
import styles from "../ReelComponent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faThumbsUp,
  faThumbsDown,
  faShare,
  faPause,
  faPlay,
  faVolumeHigh,
  faArrowRotateBack,
  faCameraAlt,
  faMusic,
  faHeart,
  faArrowsRotate,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import profile5 from "../../../assets/profile5.jpg";
import video2 from "../../../assets/media2.mp4";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../providers/AppProvider";
import { bigintToShortStr } from "../../../utils/AppUtils";

const Video = ({
  video,
  description,
  caller,
  comments,
  dislikes,
  likes,
  reel_id,
  shares,
  timestamp,
  zuri_points,
}) => {
  const { contract, address, handleWalletConnection } = useAppContext();
  const [playing, setPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const playableVideo = useRef();
  //   playableVideo.current.play();
  const handleVideoClick = () => {
    if (playableVideo.current.paused == true) {
      playableVideo.current.play();
      setPlaying(true);
      console.log(playableVideo.current);
    } else {
      playableVideo.current.pause();
      setPlaying(false);
    }
  };

  const handleLike = () => {
    // alert("working");
    if (address) {
      const myCall = contract.populate("like_reel", [reel_id]);
      setLoading(true);
      contract["like_reel"](myCall.calldata)
        .then((res) => {
          console.info("Successful Response:", res);
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      handleWalletConnection();
    }
  };

  const followUser = () => {
    if (address) {
      const myCall = contract.populate("follow_user", [caller]);
      setLoading(true);
      contract["follow_user"](myCall.calldata)
        .then((res) => {
          console.info("Successful Response:", res);
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    const scroll = document.getElementById("video-container");

    if (scroll) {
      scroll.addEventListener("scroll", () => {
        playableVideo.current.pause();
      });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 1.0 }
    );
    observer.observe(playableVideo.current);
    return () => {
      if (playableVideo.current) {
        setIsVisible(false);
        observer.unobserve(playableVideo.current);
      }
    };
  }, [playableVideo]);

  useEffect(() => {
    if (isVisible) {
      playableVideo.current.play();
      setPlaying(true);
    } else {
      playableVideo.current.pause();
      setPlaying(false);
    }
  }, [isVisible]);

  useEffect(() => {
    const view_user = () => {
      const myCall = contract.populate("view_user", [caller]);
      setLoading(true);
      contract["view_user"](myCall.calldata, {
        parseResponse: false,
        parseRequest: false,
      })
        .then((res) => {
          let val = contract.callData.parse("view_user", res?.result ?? res);
          console.log(val);
          setUser(val);
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (contract) {
      view_user();
    }
  }, [isVisible]);
  return (
    <div className={styles.video}>
      <div className={styles.videoHeader}>
        <span className={styles.material_icons}>
          <FontAwesomeIcon icon={faArrowRotateBack} />
        </span>
        <h3>Reels</h3>
        <Link to="/reels/new-reel" className={styles.material_icons}>
          <FontAwesomeIcon icon={faCameraAlt} />
        </Link>
      </div>
      <video
        src={video}
        preload="auto"
        onClick={handleVideoClick}
        ref={playableVideo}
        className={styles.video__player}
        loop
      ></video>
      <div className={styles.videoFooter}>
        <div className={styles.videoFooter__text}>
          <img className={styles.user__avatar} src={profile5} alt="" />
          &nbsp;
          <h3>
            {user && bigintToShortStr(user.username)} .{"   "}
            <button
              onClick={followUser}
              className="w3-button w3-blue w3-small w3-round"
            >
              follow
            </button>
          </h3>
        </div>
        <div className={styles.videoFooter__ticker}>
          <FontAwesomeIcon icon={faMusic} />
          <marquee className="w3-large w3-padding">{description}</marquee>
        </div>
        <div className={styles.videoFooter__actions}>
          <div className={styles.videoFooter__actionsRight}>
            <div className={styles.videoFooter__stat}>
              <span className={styles.material__icons}>
                <FontAwesomeIcon
                  type="button"
                  onClick={handleLike}
                  icon={faHeart}
                />
              </span>
              <p>{likes}</p>
            </div>
            <div className={styles.videoFooter__stat}>
              <span className={styles.material__icons}>
                <FontAwesomeIcon icon={faThumbsDown} />
              </span>
              <p>{dislikes}</p>
            </div>
            <div className={styles.videoFooter__stat}>
              <span className={styles.material__icons}>
                <FontAwesomeIcon icon={faMessage} />
              </span>
              <p>{comments}</p>
            </div>
            <div className={styles.videoFooter__stat}>
              <span className={styles.material__icons}>
                <FontAwesomeIcon icon={faArrowsRotate} />
              </span>
              <p>{shares}</p>
            </div>
            <div className={styles.videoFooter__stat}>
              <span className={styles.material__icons}>
                <FontAwesomeIcon icon={faCoins} />
              </span>
              <p>{zuri_points}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;

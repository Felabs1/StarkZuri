import React, { useEffect, useState } from "react";
import styles from "./ReelComponent.module.css";
import video from "../../assets/nature.mp4";
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
} from "@fortawesome/free-solid-svg-icons";
import profile5 from "../../assets/profile5.jpg";
import video2 from "../../assets/media2.mp4";
import Video from "./video_essentials/Video";
import funnyjude from "../../assets/funnyjude.mp4";

import { useAppContext } from "../../providers/AppProvider";
import { bigintToLongAddress } from "../../utils/AppUtils";

const ReelComponent = () => {
  const { contract } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [reels, setReels] = useState([]);

  useEffect(() => {
    const view_reels = () => {
      const myCall = contract.populate("view_reels", []);
      setLoading(true);
      contract["view_reels"](myCall.calldata, {
        parseResponse: false,
        parseRequest: false,
      })
        .then((res) => {
          let val = contract.callData.parse("view_reels", res?.result ?? res);
          const shuffledArray = val
            .slice()
            .map((obj) => ({ ...obj }))
            .sort(() => Math.random() - 0.5);
          setReels(shuffledArray);
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (contract) {
      view_reels();
    }
  }, [contract]);
  return (
    <div className={styles.body}>
      <div className={styles.app__videos} id="video-container">
        {reels &&
          reels.map((reel, id) => {
            return (
              <Video
                key={id}
                video={reel.video}
                description={reel.description}
                caller={bigintToLongAddress(reel.caller)}
                comments={reel.comments.toString()}
                dislikes={reel.dislikes.toString()}
                likes={reel.likes.toString()}
                reel_id={reel.reel_id.toString()}
                shares={reel.shares.toString()}
                zuri_points={reel.zuri_points.toString()}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ReelComponent;

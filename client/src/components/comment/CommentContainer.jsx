import React, { useEffect, useState } from "react";
import styles from "./CommentContainer.module.css";
import profile1 from "../../assets/crystals.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListDots,
  faNavicon,
  faCommentDots,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import InnerThread from "./InnerThread";
import { useAppContext } from "../../providers/AppProvider";
import { bigintToLongAddress, bigintToShortStr } from "../../utils/AppUtils";

const CommentContainer = ({
  containsThread,
  username,
  userAddress,
  time_commented,
  profilePic,
  content,
  likes,
  postId,
  replies,
}) => {
  const { contract } = useAppContext();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const view_user = () => {
      const myCall = contract.populate("view_user", [userAddress]);
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

    if (contract && userAddress) {
      view_user();
    }
  }, [contract]);

  return (
    <div className={styles.comment_container}>
      {user && (
        <div className={styles.comment_header}>
          <div className={styles.commenter_profile_and_name}>
            <div
              className={styles.commenter_profile}
              style={{
                backgroundImage: `url(${user.profile_pic})`,
              }}
            ></div>
            <div className={styles.commenter_name}>
              <span>{bigintToShortStr(user.username)}</span>&nbsp;
              <span className={styles.duration}>{time_commented}</span>
            </div>
          </div>

          {/* <div className={styles.comment_menu}>
          <FontAwesomeIcon icon={faCommentDots} />
        </div> */}
        </div>
      )}
      <div className={styles.comment_body}>
        <p>{content && content}</p>
        {containsThread == true && <InnerThread />}
      </div>
      {/* <div className={styles.comment_footer}>
        <button className={styles.react_button}>
          {likes && likes.toString()}
          <FontAwesomeIcon icon={faSmile} />
        </button>
        <button className={styles.reply_button}>reply</button>
      </div> */}
    </div>
  );
};

export default CommentContainer;

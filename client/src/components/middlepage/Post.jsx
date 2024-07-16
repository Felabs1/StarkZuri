import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CallData, cairo } from "starknet";
import {
  faListDots,
  faMessage,
  faHeart,
  faEye,
  faShare,
  faDiamond,
  faPaperclip,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./Post.module.css";
import profile from "../../assets/ST4.png";
import postimg from "../../assets/post_img.jpg";
import CommentContainer from "../comment/CommentContainer";
import { Link } from "react-router-dom";
import { useAppContext } from "../../providers/AppProvider";
import { CONTRACT_ADDRESS } from "../../providers/abi";
import { useNavigate } from "react-router-dom";

const Post = ({
  username,
  profile_pic,
  time_posted,
  user_image,
  content,
  images,
  likes,
  shares,
  comments,
  zuri_points,
  postId,
}) => {
  const { contract, provider, address, handleWalletConnection } =
    useAppContext();
  const [loading, setLoading] = useState(false);
  const commentText = useRef();
  const navigate = useNavigate();

  const comment_on_post = async () => {
    if (address) {
      const _comment_text = commentText.current.value;
      const myCall = contract.populate("comment_on_post", [
        postId,
        _comment_text,
      ]);
      setLoading(true);
      // contract["comment_on_post"](myCall.calldata)
      //   .then((res) => {
      //     console.info("Successful Response:", res);
      //   })
      //   .catch((err) => {
      //     console.error("Error: ", err);
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });
      const result = await provider.execute([
        {
          contractAddress:
            "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
          entrypoint: "approve",
          calldata: CallData.compile({
            spender: CONTRACT_ADDRESS,
            amount: cairo.uint256(5900000000000n),
          }),
        },
        {
          contractAddress: CONTRACT_ADDRESS,
          entrypoint: "comment_on_post",
          calldata: myCall.calldata,
        },
      ]);
    } else {
      handleWalletConnection();
    }
  };

  const like_post = async (e) => {
    if (address) {
      const myCall = contract.populate("like_post", [postId]);
      setLoading(true);
      // contract["like_post"](myCall.calldata)
      //   .then((res) => {
      //     console.info("Successful Response:", res);
      //   })
      //   .catch((err) => {
      //     console.error("Error: ", err);
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });

      const result = await provider.execute([
        {
          contractAddress:
            "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
          entrypoint: "approve",
          calldata: CallData.compile({
            spender: CONTRACT_ADDRESS,
            amount: cairo.uint256(31000000000000n),
          }),
        },
        {
          contractAddress: CONTRACT_ADDRESS,
          entrypoint: "like_post",
          calldata: myCall.calldata,
        },
      ]);
    } else {
      handleWalletConnection();
    }
    // await provider.waitForTransaction(result.transaction_hash);
  };
  return (
    <div className={`${styles.gradient_border}`}>
      <div
        className={styles.post_navigation}
        onClick={() => navigate(`/post/${postId}`)}
      >
        <div className={styles.profile}>
          <img src={`${profile_pic}` ?? profile} />
          <div className={styles.profile_details}>
            <span>{username}</span>
            <br />
            <small>1 hr ago</small>
          </div>
        </div>
        <div>
          <Link to={`/post/${postId}`}>
            <FontAwesomeIcon icon={faEye} />
          </Link>
        </div>
      </div>
      <div className={styles.post_body}>
        <p>{content}</p>
        <div className={styles.post_media}>
          {images &&
            images.map((image) => {
              return <img src={`${image}`} /> || "";
            })}
        </div>
      </div>
      <br />
      <div className={`w3-bar ${styles.interaction_bar}`}>
        <Link to={`/post/${postId}`} className="w3-bar-item">
          <FontAwesomeIcon icon={faMessage} />
          &nbsp; {comments} comments
        </Link>
        <button
          className="w3-bar-item w3-transparent w3-text-white"
          value={postId}
          onClick={like_post}
        >
          <FontAwesomeIcon className="w3-text-red" icon={faHeart} />
          &nbsp; {likes} likes
        </button>
        <a className="w3-bar-item">
          <FontAwesomeIcon icon={faShare} />
          &nbsp;{shares} shares
        </a>
        <a className="w3-bar-item">
          <FontAwesomeIcon icon={faDiamond} />
          &nbsp;{zuri_points} ZuriTokens
        </a>
      </div>
      <hr />
      <div className={styles.comment_interaction_section}>
        <img src={`${profile_pic}` ?? profile} />
        <div className={styles.comment_field}>
          <input
            className="w3-input"
            ref={commentText}
            placeholder="write your comment"
          />

          {/* <FontAwesomeIcon
            icon={faPaperclip}
            className={`${styles.comment_button} w3-padding`}
          />
          <FontAwesomeIcon
            icon={faImage}
            className={`${styles.comment_button} w3-padding`}
          /> */}
          <button className="w3-btn w3-blue w3-round" onClick={comment_on_post}>
            comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;

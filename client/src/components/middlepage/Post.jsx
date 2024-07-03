import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const Post = ({
  username,
  profile_pic,
  time_posted,
  content,
  images,
  likes,
  shares,
  comments,
  postId,
}) => {
  return (
    <div className={`${styles.gradient_border}`}>
      <div className={styles.post_navigation}>
        <div className={styles.profile}>
          <img src={`http://localhost:3000/${profile_pic}` ?? profile} />
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
              return <img src={`http://localhost:3000/${image}`} /> || "";
            })}
        </div>
      </div>
      <br />
      <div className={`w3-bar ${styles.interaction_bar}`}>
        <Link to={`/post/${postId}`} className="w3-bar-item">
          <FontAwesomeIcon icon={faMessage} />
          &nbsp; {comments} comments
        </Link>
        <a className="w3-bar-item">
          <FontAwesomeIcon className="w3-text-red" icon={faHeart} />
          &nbsp; {likes} likes
        </a>
        <a className="w3-bar-item">
          <FontAwesomeIcon icon={faShare} />
          &nbsp;{shares} shares
        </a>
        <a className="w3-bar-item">
          <FontAwesomeIcon icon={faDiamond} />
          &nbsp;2 Diamonds
        </a>
      </div>
      <hr />
      <div className={styles.comment_interaction_section}>
        <img src={profile} />
        <div className={styles.comment_field}>
          <input className="w3-input" placeholder="write your comment" />

          <FontAwesomeIcon
            icon={faPaperclip}
            className={`${styles.comment_button} w3-padding`}
          />
          <FontAwesomeIcon
            icon={faImage}
            className={`${styles.comment_button} w3-padding`}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;

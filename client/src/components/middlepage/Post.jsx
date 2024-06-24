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

const Post = () => {
  return (
    <div className={`${styles.gradient_border}`}>
      <div className={styles.post_navigation}>
        <div className={styles.profile}>
          <img src={profile} />
          <div className={styles.profile_details}>
            <span>Felabs</span>
            <br />
            <small>1 hr ago</small>
          </div>
        </div>
        <div>
          <Link to="/post/2">
            <FontAwesomeIcon icon={faEye} />
          </Link>
        </div>
      </div>
      <div className={styles.post_body}>
        <h4>5 Advantages of developing on starknet</h4>
        <p>
          1: data ownership
          <br />
          2: fast transactions
          <br />
          3: cheap transaction fees
          <br />
          <br />
          Learn more in our new Blog
        </p>
        <img src={postimg} />
      </div>
      <br />
      <div className={`w3-bar ${styles.interaction_bar}`}>
        <Link to="/post/3" className="w3-bar-item">
          <FontAwesomeIcon icon={faMessage} />
          &nbsp; 16 comments
        </Link>
        <a className="w3-bar-item">
          <FontAwesomeIcon className="w3-text-red" icon={faHeart} />
          &nbsp; 5694 likes
        </a>
        <a className="w3-bar-item">
          <FontAwesomeIcon icon={faShare} />
          &nbsp;5 shares
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

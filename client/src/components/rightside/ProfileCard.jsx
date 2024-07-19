import React, { useEffect, useState } from "react";
import styles from "./ProfileCard.module.css";
import profilePic from "../../assets/profile_gradient.jpg";
import avatar from "../../assets/ST4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faG,
  faGlobeAfrica,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { bigintToLongAddress, bigintToShortStr } from "../../utils/AppUtils";
import { useAppContext } from "../../providers/AppProvider";

const ProfileCard = ({
  about,
  cover_photo,
  date_registered,
  name,
  no_of_followers,
  notifications,
  no_following,
  profile_pic,
  userId,
  username,
  zuri_points,
}) => {
  const navigate = useNavigate();

  return (
    <div className={`w3-padding ${styles.profile_card}`}>
      <div
        className={styles.profile_image}
        style={{
          backgroundImage: `url(${cover_photo})`,
        }}
      ></div>
      <div
        className={`w3-center w3-border ${styles.profile_avatar}`}
        style={{
          backgroundImage: `url(${profile_pic})`,
        }}
      ></div>

      <div className={styles.followers_div}>
        <div className={styles.followers}>
          <b>{no_of_followers}</b>
          <br />
          <small>Followers</small>
        </div>
        <div className={styles.followers}>
          <b>{no_following}</b>
          <br />
          <small>Following</small>
        </div>
      </div>
      <br />
      <div className={styles.avatar_description}>
        <span className="w3-large w3-center">{name}</span>
        <br />
        <span className={styles.profile_name}>@{username ?? username}</span>
        <br />
        <small>{zuri_points} Zuri Points</small>
        <br />
        <br />
        <span>{about}</span>
        <br />
        <br />
        <div className={styles.profile_more_info}>
          <small className="w3-text-blue">
            {" "}
            <FontAwesomeIcon icon={faGlobeAfrica} />
            &nbsp;stark-zuri.vercel.app
          </small>
          <small>
            <FontAwesomeIcon icon={faCalendar} />
            &nbsp; joined {date_registered}
          </small>
        </div>
      </div>
      <br />
      <button
        onClick={() => {
          navigate("/");
        }}
        className={`w3-button w3-block ${styles.postButton}`}
      >
        Post
      </button>
      <br />
    </div>
  );
};

export default ProfileCard;

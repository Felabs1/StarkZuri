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
import { bigintToLongAddress, bigintToShortStr } from "../../utils/AppUtils";
import { useAppContext } from "../../providers/AppProvider";

const ProfileCard = () => {
  const { contract, address } = useAppContext();
  const [coverPhoto, setCoverPhoto] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [username, setUsername] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState(false);

  console.log(coverPhoto);
  console.log(profilePhoto);
  const view_users = () => {
    const myCall = contract.populate("view_all_users", []);
    setLoading(true);
    contract["view_all_users"](myCall.calldata, {
      parseResponse: false,
      parseRequest: false,
    })
      .then((res) => {
        let val = contract.callData.parse("view_all_users", res?.result ?? res);
        // console.info("success")
        // console.info("Successful Response:", val);
        console.log(val);
        val.forEach(
          ({
            cover_photo,
            profile_pic,
            userId,
            username,
            no_of_followers,
            number_following,
            about,
          }) => {
            const _address = bigintToLongAddress(userId);
            if (address == _address) {
              const _username = bigintToShortStr(username);
              setCoverPhoto(cover_photo);
              setProfilePhoto(profile_pic);
              setUsername(_username);
              setFollowers(no_of_followers.toString());
              setFollowing(number_following.toString());
              setAbout(about);
              // console.log(cover_photo);
              // console.log(profile_pic);
            }

            // console.log(_address);
          }
        );
      })
      .catch((err) => {
        console.error("Error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (contract) {
      view_users();
    }
  }, [contract]);

  return (
    <div className={`w3-padding ${styles.profile_card}`}>
      <div
        className={styles.profile_image}
        style={{
          backgroundImage: `url(${coverPhoto})`,
        }}
      ></div>
      <div
        className={`w3-center w3-border ${styles.profile_avatar}`}
        style={{
          backgroundImage: `url(${profilePhoto})`,
        }}
      ></div>

      <div className={styles.followers_div}>
        <div className={styles.followers}>
          <b>{followers}</b>
          <br />
          <small>Followers</small>
        </div>
        <div className={styles.followers}>
          <b>{following}</b>
          <br />
          <small>Following</small>
        </div>
      </div>
      <br />
      <div className={styles.avatar_description}>
        <span className={styles.profile_name}>@{username ?? username}</span>
        <br />
        <small>$0.0 coin Price</small>
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
            &nbsp; Joined June 2024
          </small>
        </div>
      </div>
      <br />
      <button className={`w3-button w3-block ${styles.postButton}`}>
        Post
      </button>
      <br />
    </div>
  );
};

export default ProfileCard;

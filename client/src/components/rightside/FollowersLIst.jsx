import React, { useEffect, useState } from "react";
import styles from "./FollowersList.module.css";
import { useAppContext } from "../../providers/AppProvider";
import { bigintToLongAddress } from "../../utils/AppUtils";

const FollowersLIst = ({ profileImage, username, followText, userAddress }) => {
  const { contract, address } = useAppContext();
  const [followers, setFollowers] = useState([]);
  const [follows, setFollows] = useState("follows");
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const followUser = () => {
    if (address) {
      const myCall = contract.populate("follow_user", [userAddress]);
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

  // function followerExist() {
  //   // return arr.some((obj) => bigintToLongAddress(obj[property]) === value);
  //   const follows = followers.find(
  //     (user) => bigintToLongAddress(user.userId) === userAddress
  //   );
  //   console.log(follows);
  // }

  useEffect(() => {
    const view_following = () => {
      const myCall = contract.populate("view_followers", [userAddress]);
      // const userAsFollowers = [];
      setLoading(true);
      contract["view_followers"](myCall.calldata, {
        parseResponse: false,
        parseRequest: false,
      })
        .then((res) => {
          let val = contract.callData.parse(
            "view_followers",
            res?.result ?? res
          );
          // console.info("success")
          // console.info("Successful Response:", val);
          // console.log(val);
          val.forEach((element) => {
            if (bigintToLongAddress(element.userId) == address) {
              // console.log("follows");
              setFollows("following");
            }
          });
          // console.log(follows);
          setFollowers(val);
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (contract) {
      view_following();
    }
  }, [contract]);

  useEffect(() => {
    const view_followers = () => {
      // console.log(address);
      const myCall = contract.populate("view_followers", [address]);
      // const userAsFollowers = [];
      setLoading(true);
      contract["view_followers"](myCall.calldata, {
        parseResponse: false,
        parseRequest: false,
      })
        .then((res) => {
          let val = contract.callData.parse(
            "view_followers",
            res?.result ?? res
          );
          // console.info("success")
          // console.info("Successful Response:", val);
          // console.log(val);
          val.forEach((element) => {
            if (bigintToLongAddress(element.userId) == userAddress) {
              setFollows("followed");
            }
          });
          // console.log(follows);
          setFollowers(val);
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (address) {
      // followerExist();
      view_followers();
    }
  }, [contract]);

  // console.log(isFollowing);

  return (
    <div className={styles.followers_list}>
      <div className={styles.followers_details}>
        <div
          className={styles.profile_image}
          style={{ backgroundImage: `url(${profileImage})` }}
        ></div>
        <div className={styles.profile_username}>{username}</div>
      </div>
      {address && (
        <div className={styles.followers_button}>
          {follows == "followed" ? (
            <button className="w3-button" onClick={followUser}>
              follow back
            </button>
          ) : follows == "following" ? (
            "following"
          ) : (
            <button className="w3-button" onClick={followUser}>
              follow
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FollowersLIst;

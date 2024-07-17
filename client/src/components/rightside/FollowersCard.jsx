import React, { useEffect, useState } from "react";
import styles from "./FollowersCard.module.css";
import profile1 from "../../assets/profile1.jpg";
import profile2 from "../../assets/profile2.jpg";
import profile3 from "../../assets/profile3.jpg";
import profile4 from "../../assets/profile5.jpg";
import FollowersLIst from "./FollowersLIst";
import { useAppContext } from "../../providers/AppProvider";
import { bigintToLongAddress, bigintToShortStr } from "../../utils/AppUtils";
import { ClipLoader } from "react-spinners";

const FollowersCard = () => {
  const { contract } = useAppContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const view_users = () => {
      const myCall = contract.populate("view_all_users", []);
      // const userAsFollowers = [];
      setLoading(true);
      contract["view_all_users"](myCall.calldata, {
        parseResponse: false,
        parseRequest: false,
      })
        .then((res) => {
          let val = contract.callData.parse(
            "view_all_users",
            res?.result ?? res
          );
          // console.info("success")
          // console.info("Successful Response:", val);
          // console.log(val);
          setUsers(val);
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (contract) {
      view_users();
    }
  }, [contract]);

  return (
    <div className={styles.followers_card}>
      <div className={styles.followers_card_header}>
        <div className={styles.left_heading}>you will like</div>
        <div className={styles.right_heading}>view all</div>
      </div>
      <br />
      {loading ? (
        <div className="w3-center">
          <ClipLoader loading={loading} color="#2196F3" size={50} />
        </div>
      ) : (
        users &&
        users.map((user, id) => {
          return (
            <FollowersLIst
              key={id}
              userAddress={bigintToLongAddress(user.userId)}
              profileImage={user.profile_pic}
              username={bigintToShortStr(user.username)}
              followText="follow"
            />
          );
        })
      )}

      {/* <FollowersLIst
        profileImage={profile1}
        username="james"
        followText="follow"
      />
      <FollowersLIst
        profileImage={profile2}
        username="charles"
        followText="follow back"
      />
      <FollowersLIst
        profileImage={profile3}
        username="jack"
        followText="follow"
      />
      <FollowersLIst
        profileImage={profile2}
        username="erick"
        followText="follow back"
      /> */}
    </div>
  );
};

export default FollowersCard;

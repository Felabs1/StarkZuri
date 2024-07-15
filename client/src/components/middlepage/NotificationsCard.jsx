import React, { useState, useEffect } from "react";
import styles from "./NotificationsCard.module.css";
import profile_5 from "../../assets/profile5.jpg";
import { useAppContext } from "../../providers/AppProvider";
import { bigintToShortStr } from "../../utils/AppUtils";
import { BounceLoader, ClipLoader } from "react-spinners";

const NotificationsCard = () => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const { contract, address } = useAppContext();
  const [users, setUsers] = useState([]);

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
          console.log(val);
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

  useEffect(() => {
    const fetch_notifications = () => {
      const myCall = contract.populate("view_notifications", [address]);
      setLoading(true);
      contract["view_notifications"](myCall.calldata, {
        parseResponse: false,
        parseRequest: false,
      })
        .then((res) => {
          let val = contract.callData.parse(
            "view_notifications",
            res?.result ?? res
          );

          // setUsers(val);
          console.log(val);
          setNotifications(val);
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (address) {
      fetch_notifications();
    }
  }, [contract, address]);
  return (
    <div className={`${styles.notifications_card}`}>
      <h3>Notifications</h3>
      <div className={`w3-bar ${styles.notifications_bar}`}>
        <a>Unread</a>
        <a>read</a>
        <a>archieved</a>
      </div>
      <br />

      <div className={styles.sub_notification_header}>
        <div className={styles.day}>
          <span className={styles.today}>Today</span>&nbsp;
          <span className="w3-tag w3-dark-gray w3-round-large">
            {notifications &&
              notifications.filter(
                (notification) =>
                  bigintToShortStr(notification.notification_status) == "unread"
              ).length}
          </span>
        </div>
        <div className={styles.option}>see all</div>
      </div>
      <br />
      {loading ? (
        <div className="w3-center">
          <ClipLoader loading={loading} color="#2196F3" size={50} />
        </div>
      ) : (
        notifications &&
        notifications.map((notification) => {
          let word = notification.notification_message.split(" ");
          let shiftedWord = word.shift();
          let newSentence = word.join(" ");
          let profilePhoto = users.find(
            (user) => user.userId == notification.caller
          );
          console.log();
          return (
            <div className={styles.notification_content}>
              <div className={styles.profile}>
                <div className={styles.online}></div>
                <div
                  className={styles.profile_pic}
                  style={{
                    backgroundImage: `url(${
                      profilePhoto && profilePhoto.profile_pic
                    })`,
                  }}
                ></div>
              </div>
              <div className={styles.description}>
                <span>
                  <b>{bigintToShortStr(shiftedWord)}</b> {newSentence}
                </span>
                <br />
                <small>2 hrs ago</small>
                <br />
                <br />
                <button className={`${styles.ignore} w3-button`}>Ignore</button>
                <button className={`${styles.respond} w3-button`}>
                  Respond
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default NotificationsCard;

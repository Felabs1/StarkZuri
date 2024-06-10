import React from "react";
import styles from "./NotificationsCard.module.css";
import profile_5 from "../../assets/profile5.jpg";

const NotificationsCard = () => {
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
          <span className="w3-tag w3-dark-gray w3-round-large">8</span>
        </div>
        <div className={styles.option}>see all</div>
      </div>
      <br />
      <div className={styles.notification_content}>
        <div className={styles.profile}>
          <div className={styles.online}></div>
          <div
            className={styles.profile_pic}
            style={{ backgroundImage: `url(${profile_5})` }}
          ></div>
        </div>
        <div className={styles.description}>
          <span>
            <b>James Wasonga</b> Followed you
          </span>
          <br />
          <small>2 hrs ago</small>
          <br />
          <br />
          <button className={`${styles.ignore} w3-button`}>Ignore</button>
          <button className={`${styles.respond} w3-button`}>Respond</button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsCard;

import React from "react";
import styles from "./ContactNavigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faEdit,
  faPeopleArrows,
  faPeopleGroup,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Message from "./Message";
import profile1 from "../../assets/profile1.jpg";
import profile2 from "../../assets/profile2.jpg";
import profile3 from "../../assets/profile3.jpg";
import profile5 from "../../assets/profile5.jpg";
import profile6 from "../../assets/crystals.jpg";

const ContactNavigation = () => {
  return (
    <div className={styles.contact_navigation}>
      <div className={styles.contact_navigation_head}>
        <div
          className={styles.contact_avatar}
          style={{ backgroundImage: `url(${profile1})` }}
        ></div>
        <div
          className={styles.contact_avatar}
          style={{ backgroundImage: `url(${profile2})` }}
        ></div>
        <div
          className={styles.contact_avatar}
          style={{ backgroundImage: `url(${profile3})` }}
        ></div>
        <div
          className={styles.contact_avatar}
          style={{ backgroundImage: `url(${profile5})` }}
        ></div>
        <div
          className={styles.contact_avatar}
          style={{ backgroundImage: `url(${profile6})` }}
        ></div>
      </div>
      <hr />
      <div className={styles.message_heading}>
        <div>
          <span className="w3-large">Message</span>&nbsp;
          <span className="w3-small w3-text-blue">2 New</span>
        </div>
        <div className={`w3-right ${styles.edit_icon}`}>
          <span className="w3-right">
            <FontAwesomeIcon icon={faEdit} />
          </span>
        </div>
        &nbsp;
      </div>
      <br />
      <div className={styles.search_input}>
        <input className="w3-input" placeholder="search" />
        <button className="w3-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <h5 className="w3-small">
        <FontAwesomeIcon icon={faCaretRight} />
        &nbsp; PINNED CHAT
      </h5>
      <Message
        contactName="Babe❤️💝"
        message="Hey, thanks for the tokens, love you😘"
        amount={1}
        time="12m"
        image={profile1}
      />
      <h5 className="w3-small">
        <FontAwesomeIcon icon={faPeopleGroup} />
        &nbsp; GROUP CHATS
      </h5>
      <Message
        contactName="ZURI Team"
        message="we have an bug update..."
        amount={4}
        time="now"
        image={profile2}
      />
      <br />
      <h5 className="w3-small">ALL MESSAGES</h5>
      <Message
        contactName="Alex"
        image={profile3}
        message="voice message"
        time="20m"
      />
      <Message
        contactName="James"
        image={profile5}
        message="hello..."
        amount={1}
        time="now"
      />
    </div>
  );
};

export default ContactNavigation;

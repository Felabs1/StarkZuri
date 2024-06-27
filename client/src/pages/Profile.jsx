import React, { useState } from "react";
import TopNav from "../components/navigation/TopNav";
import SideNav from "../components/navigation/SideNav";
import Main from "../components/middlepage/Main";
import MobileSidenav from "../components/navigation/MobileSidenav";
import AssetsCard from "../components/rightside/AssetsCard";
import FollowersCard from "../components/rightside/FollowersCard";
import ProfileCard from "../components/rightside/ProfileCard";
import FloatingButton from "../components/navigation/FloatingButton";
import ProfileCardMiddle from "../components/profile_essentials/ProfileCardMiddle";
import ProfileNavigationButtons from "../components/profile_essentials/ProfileNavigationButtons";
import SubNavigation from "../components/navigation/SubNavigation";
import Post from "../components/middlepage/Post";
import ModalContainer from "../components/modal/ModalContainer";
import styles from "./styles/Profile.module.css";

const Profile = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMobileMenuClick = () => {
    setNavOpen(!navOpen);
    console.log("something is wrong");
    console.log(navOpen);
  };
  return (
    <div>
      <TopNav onMobileMenuClick={handleMobileMenuClick} />
      <SideNav />

      {navOpen && <MobileSidenav />}

      <Main>
        {modalOpen && (
          <ModalContainer closeModal={() => setModalOpen(false)}>
            <h3>Edit profile</h3>
            <hr />
            <label>Name</label>
            <input
              className={`w3-input w3-border w3-round ${styles.input}`}
              type="text"
            />
            <label>userName</label>
            <input
              className={`w3-input w3-border w3-round ${styles.input}`}
              type="text"
            />
            <label>profile pic</label>
            <input
              className={`w3-input w3-border w3-round ${styles.input}`}
              type="file"
            />
            <label>Cover photo</label>
            <input
              className={`w3-input w3-border w3-round ${styles.input}`}
              type="file"
            />
            <button className={`w3-btn w3-block w3-round w3-blue`}>
              update
            </button>
          </ModalContainer>
        )}
        <div className="w3-row-padding w3-stretch">
          <div className="w3-col l8">
            <ProfileCard />
            <br />
            <ProfileNavigationButtons onModalOpen={() => setModalOpen(true)} />
            <SubNavigation
              borderData={[
                { linkName: "posts" },
                { linkName: "blog" },
                { linkName: "Zuri Coin" },
                { linkName: "Diamonds" },
                { linkName: "NFTs" },
              ]}
            />
            <br />
            <Post />
          </div>

          <div className="w3-col l4">
            <AssetsCard />
            <br />
            <FollowersCard />
          </div>
        </div>
        <FloatingButton />
      </Main>
    </div>
  );
};

export default Profile;

import React, { useState, useRef, useEffect } from "react";
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
import { useAppContext } from "../providers/AppProvider";
import { bigintToShortStr } from "../utils/AppUtils";
import BigNumber from "bignumber.js";

const Profile = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { contract } = useAppContext();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");
  const [cover, setCover] = useState("");

  const profileImage = useRef();
  const coverImage = useRef();

  useEffect(() => {
    console.log(cover);
  }, [cover]);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleuserNameChange = async (e) => {
    setUsername(e.target.value);
  };

  const handleProfileChange = async (e) => {
    const _profile = profileImage.current.files[0];
    if (!_profile) {
      alert("please input file for upload");
    } else {
      const formdata = new FormData();
      formdata.append("image", _profile);
      try {
        const response = await fetch("http://localhost:3000/upload-image/", {
          method: "POST",
          body: formdata,
        });
        if (response.ok) {
          const result = await response.text();
          console.log("profile image uploaded successfully");
          console.log(result);

          setProfile(result);
          console.log(profile);
        } else {
          console.log("image upload failed");
        }
      } catch (error) {
        console.error("Error", error);
        alert("an error occured while uploading the image");
      }
    }
  };

  const handleCoverChange = async (e) => {
    const _cover = coverImage.current.files[0];
    if (!_cover) {
      alert("please input file for upload");
    } else {
      const formdata = new FormData();
      formdata.append("image", _cover);
      try {
        const response = await fetch("http://localhost:3000/upload-image/", {
          method: "POST",
          body: formdata,
        });
        if (response.ok) {
          const result = await response.text();
          console.log("profile image uploaded successfully");
          setCover(result);
          console.log(result);
        } else {
          console.log("image upload failed");
        }
      } catch (error) {
        console.error("Error", error);
        alert("an error occured while uploading the image");
      }
    }
  };

  const makeInteraction = () => {
    // console.log(name);
    // console.log(username);
    // console.log(profile);
    // console.log(cover);
    const myCall = contract.populate("add_user", [
      name,
      username,
      profile,
      cover,
    ]);
    setLoading(true);
    contract["add_user"](myCall.calldata)
      .then((res) => {
        console.info("Successful Response:", res);
      })
      .catch((err) => {
        console.error("Error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // let readableNo = BigNumber("1952805748").toString();
  // console.log(readableNo);

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
        console.info("Successful Response:", val);
      })
      .catch((err) => {
        console.error("Error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // view_users();

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
              onChange={handleNameChange}
              className={`w3-input w3-border w3-round ${styles.input}`}
              type="text"
            />

            <label>userName</label>
            <input
              onChange={handleuserNameChange}
              className={`w3-input w3-border w3-round ${styles.input}`}
              type="text"
            />
            <label>profile pic</label>
            <input
              className={`w3-input w3-border w3-round ${styles.input}`}
              type="file"
              onChange={handleProfileChange}
              ref={profileImage}
              accept="image/*"
            />
            <label>Cover photo</label>
            <input
              className={`w3-input w3-border w3-round ${styles.input}`}
              type="file"
              onChange={handleCoverChange}
              ref={coverImage}
            />
            <button
              onClick={makeInteraction}
              className={`w3-btn w3-block w3-round w3-blue`}
            >
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

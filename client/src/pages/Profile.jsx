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
import {
  bigintToLongAddress,
  bigintToShortStr,
  convertToReadableNumber,
  formatDate,
  timeAgo,
} from "../utils/AppUtils";
import BigNumber from "bignumber.js";
import { uploadToIPFS } from "../Infura";
import ConnectWallet from "./login_page/ConnectWallet";

const Profile = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { contract, address } = useAppContext();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");
  const [cover, setCover] = useState("");
  const [about, setAbout] = useState("");
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  const [coverPhoto, setCoverPhoto] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const profileImage = useRef();
  const coverImage = useRef();

  useEffect(() => {
    console.log(cover);
    // console.log(address)
  }, [cover]);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  const view_user = () => {
    const myCall = contract.populate("view_user", [address]);
    setLoading(true);
    contract["view_user"](myCall.calldata, {
      parseResponse: false,
      parseRequest: false,
    })
      .then((res) => {
        let val = contract.callData.parse("view_user", res?.result ?? res);
        console.log(val);
        setUser(val);
      })
      .catch((err) => {
        console.error("Error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const get_individual_posts = () => {
    const myCall = contract.populate("filter_post", [address]);
    setLoading(true);
    contract["filter_post"](myCall.calldata, {
      parseResponse: false,
      parseRequest: false,
    })
      .then((res) => {
        let val = contract.callData.parse("filter_post", res?.result ?? res);
        console.log(val);
        setPosts(val.reverse());
      })
      .catch((err) => {
        console.error("Error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleuserNameChange = async (e) => {
    setUsername(e.target.value);
  };

  async function onChangeFile(e) {
    var file = e.target.files[0];

    const response = await uploadToIPFS(file);

    console.log(response);

    setProfilePhoto(response);
  }

  const handleCoverChange = async (e) => {
    var file = e.target.files[0];

    const response = await uploadToIPFS(file);

    console.log(response);

    setCoverPhoto(response);
  };

  const makeInteraction = () => {
    // console.log(name);
    // console.log(username);
    // console.log(profile);
    // console.log(cover);
    const myCall = contract.populate("add_user", [
      name,
      username,
      about,
      profilePhoto,
      coverPhoto,
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

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  useEffect(() => {
    if (contract && address) {
      view_user();
      get_individual_posts();
    }
  }, [contract]);

  const handleMobileMenuClick = () => {
    setNavOpen(!navOpen);
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
            <label>about</label>
            <input
              onChange={handleAboutChange}
              className={`w3-input w3-border w3-round ${styles.input}`}
              type="text"
            />
            <label>profile pic</label>
            <input
              className={`w3-input w3-border w3-round ${styles.input}`}
              type="file"
              onChange={onChangeFile}
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
            {address ? (
              <>
                {address && user ? (
                  <ProfileCard
                    about={user.about}
                    name={bigintToShortStr(user.name)}
                    username={bigintToShortStr(user.username)}
                    no_following={user.number_following.toString()}
                    no_of_followers={user.no_of_followers.toString()}
                    profile_pic={user.profile_pic}
                    cover_photo={user.cover_photo}
                    zuri_points={user.zuri_points.toString()}
                    date_registered={formatDate(
                      user.date_registered.toString() * 1000
                    )}
                  />
                ) : (
                  ""
                )}
                <br />
                <ProfileNavigationButtons
                  onModalOpen={() => setModalOpen(true)}
                />
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
                {posts
                  ? posts.map((post) => {
                      return (
                        <Post
                          key={post.postId}
                          postId={post.postId.toString()}
                          content={post.content}
                          likes={post.likes.toString()}
                          comments={post.comments.toString()}
                          shares={post.shares.toString()}
                          zuri_points={post.zuri_points.toString()}
                          userAddress={
                            post.caller ? bigintToLongAddress(post.caller) : ""
                          }
                          images={post.images.split(" ")}
                          time_posted={timeAgo(
                            post.date_posted.toString() * 1000
                          )}
                        />
                      );
                    })
                  : ""}
              </>
            ) : (
              <ConnectWallet />
            )}
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

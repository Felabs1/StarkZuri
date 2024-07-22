import React, { useState, useEffect } from "react";

import TopNav from "../../components/navigation/TopNav";
import SideNav from "../../components/navigation/SideNav";
import Main from "../../components/middlepage/Main";
import MobileSidenav from "../../components/navigation/MobileSidenav";
import AssetsCard from "../../components/rightside/AssetsCard";
import FollowersCard from "../../components/rightside/FollowersCard";
import ProfileCard from "../../components/rightside/ProfileCard";
import FloatingButton from "../../components/navigation/FloatingButton";
import ProfileCardMiddle from "../../components/profile_essentials/ProfileCardMiddle";
import ProfileNavigationButtons from "../../components/profile_essentials/ProfileNavigationButtons";
import SubNavigation from "../../components/navigation/SubNavigation";
import Post from "../../components/middlepage/Post";
import ModalContainer from "../../components/modal/ModalContainer";
import styles from "../styles/Profile.module.css";
import { useAppContext } from "../../providers/AppProvider";
import {
  bigintToLongAddress,
  bigintToShortStr,
  convertToReadableNumber,
  formatDate,
  timeAgo,
} from "../../utils/AppUtils";
import { useParams } from "react-router-dom";
const UserProfile = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(false);
  const [user, setUser] = useState(null);
  const { contract } = useAppContext();
  const { userAddress } = useParams();

  const get_individual_posts = () => {
    const myCall = contract.populate("filter_post", [userAddress]);
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

  const view_user = () => {
    const myCall = contract.populate("view_user", [userAddress]);
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

  useEffect(() => {
    if (contract) {
      view_user();
    }
  }, [contract, userAddress]);

  useEffect(() => {
    if (contract) {
      get_individual_posts();
    }
  }, [contract, userAddress]);

  //   console.log(userAddress);
  return (
    <div>
      <TopNav />
      <SideNav />

      {navOpen && <MobileSidenav />}

      <Main>
        <div className="w3-row-padding w3-stretch">
          <div className="w3-col l8">
            {user && (
              <ProfileCard
                name={bigintToShortStr(user.name)}
                username={bigintToShortStr(user.username)}
                cover_photo={user.cover_photo}
                profile_pic={user.profile_pic}
                zuri_points={user.zuri_points.toString()}
                no_of_followers={user.no_of_followers.toString()}
                no_following={user.number_following.toString()}
                date_registered={formatDate(
                  user.date_registered.toString() * 1000
                )}
                about={user.about}
              />
            )}
            <br />
            {/* <ProfileNavigationButtons onModalOpen={() => setModalOpen(true)} /> */}
            <SubNavigation
              borderData={[
                { linkName: "posts" },
                // { linkName: "blog" },
                { linkName: "Zuri Claims" },
                // { linkName: "Diamonds" },
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
                      time_posted={timeAgo(post.date_posted.toString() * 1000)}
                    />
                  );
                })
              : ""}
          </div>

          <div className="w3-col l4">
            {/* <AssetsCard /> */}
            <br />
            <FollowersCard />
          </div>
        </div>
        <FloatingButton />
      </Main>
    </div>
  );
};

export default UserProfile;

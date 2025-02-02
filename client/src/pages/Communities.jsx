import React, { useState, useEffect } from "react";
import TopNav from "../components/navigation/TopNav";
import SideNav from "../components/navigation/SideNav";
import Main from "../components/middlepage/Main";
import { useAppContext } from "../providers/AppProvider";
import MobileSidenav from "../components/navigation/MobileSidenav";
import ProfileCard from "../components/rightside/ProfileCard";
import AssetsCard from "../components/rightside/AssetsCard";
import FollowersCard from "../components/rightside/FollowersCard";
import ExploreHeader from "../components/middlepage/ExploreHeader";
import PostCard from "../components/postcard/PostCard";
import { bigintToShortStr, formatDate } from "../utils/AppUtils";

import crystals from "../assets/crystals.jpg";
import CommunityPosts from "./community_essentials/community_tabs/CommunityPosts";

const Communities = () => {
  const tabs = [
    { name: "Posts", content: <CommunityPosts /> },
    { name: "Polls", content: "this is polls" },
    { name: "Events", content: "this is event" },
    { name: "Leaderboard", content: "this is leaderboard" },
  ];
  const [navOpen, setNavOpen] = useState(false);
  const { contract, address } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

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

  const handleMobileMenuClick = () => {
    setNavOpen(!navOpen);
    console.log("something is wrong");
    console.log(navOpen);
  };

  useEffect(() => {
    if (contract && address) {
      view_user();
    }
  }, [contract]);

  return (
    <div>
      <TopNav onMobileMenuClick={handleMobileMenuClick} />
      <SideNav />

      {navOpen && <MobileSidenav />}
      <Main>
        <div className="w3-row-padding w3-stretch">
          <div className="w3-col l8">
            <ExploreHeader
              paragraph="Core supporters of the product. we value your prescence"
              heading="Zuri Pioneers Community"
              datecreated="created December 2024"
            />
            <br />
            <br />
            <span>
              <b>2k</b>
            </span>{" "}
            Members &nbsp;
            {tabs.map((tab, index) => {
              return (
                <>
                  &nbsp;
                  <button
                    key={index}
                    onClick={() => {
                      setActiveTab(index);
                      console.log(index);
                    }}
                    className={`w3-button w3-border w3-round-xlarge ${
                      activeTab === index ? "w3-border-blue" : ""
                    }`}
                  >
                    {tab.name}
                  </button>
                </>
              );
            })}
            &nbsp;
            <br />
            <br />
            <br />
            {tabs[activeTab].content}
            <div className="w3-container"></div>
          </div>
          <div className="w3-col l4 w3-hide-small">
            {address && user ? (
              <ProfileCard
                about={user.about ? user.about : ""}
                name={user.name ? bigintToShortStr(user.name) : ""}
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
            <AssetsCard />
            <br />
            <FollowersCard />
          </div>
        </div>
      </Main>
    </div>
  );
};

export default Communities;

import React, { useState, useEffect } from "react";
import { CallData, cairo } from "starknet";
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
import { CONTRACT_ADDRESS } from "../providers/abi";
import { ToastContainer, toast } from "react-toastify";
import crystals from "../assets/crystals.jpg";
import CommunityPosts from "./community_essentials/community_tabs/CommunityPosts";
import CommunityPolls from "./community_essentials/community_tabs/CommunityPolls";
import CommunityEvents from "./community_essentials/community_tabs/CommunityEvents";
import CommunityLeaderboard from "./community_essentials/community_tabs/CommunityLeaderboard";
import { useParams } from "react-router-dom";

const Communities = () => {
  const tabs = [
    { name: "Posts", content: <CommunityPosts /> },
    // { name: "Polls", content: <CommunityPolls /> },
    // { name: "Events", content: <CommunityEvents /> },
    // { name: "Leaderboard", content: <CommunityLeaderboard /> },
  ];
  const [navOpen, setNavOpen] = useState(false);
  const { contract, address, provider, handleWalletConnection } =
    useAppContext();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [communityMembers, setCommunityMembers] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const { id } = useParams();

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

  const joinCommunity = async () => {
    if (address) {
      const myCall = contract.populate("join_community", [id]);
      setLoading(true);

      const result = await provider
        .execute([
          {
            contractAddress:
              "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
            entrypoint: "approve",
            calldata: CallData.compile({
              spender: CONTRACT_ADDRESS,
              amount: cairo.uint256(31000000000000n),
            }),
          },
          {
            contractAddress: CONTRACT_ADDRESS,
            entrypoint: "join_community",
            calldata: myCall.calldata,
          },
        ])
        .then((res) => {
          console.log(res);
          toast.info("community joined successfully", {
            className: styles.toast_message,
          });
          commentText.current.value = "";
          setLoading(false);
        });
    } else {
      handleWalletConnection();
    }
  };

  const viewCommunityMembers = () => {
    const myCall = contract.populate("view_community_members", [id]);
    setLoading(true);
    contract["view_community_members"](myCall.calldata, {
      parseResponse: false,
      parseRequest: false,
    })
      .then((res) => {
        let val = contract.callData.parse(
          "view_community_members",
          res?.result ?? res
        );
        console.log(val);
        setCommunityMembers(val);
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
    if (contract) {
      viewCommunityMembers();
    }
  }, [contract]);

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
              <b>{communityMembers && communityMembers.length}</b>
            </span>{" "}
            {communityMembers && communityMembers.length > 1
              ? "members"
              : "member"}{" "}
            &nbsp;
            <button
              onClick={joinCommunity}
              className={`w3-button w3-border w3-round-xlarge`}
            >
              Join Community
            </button>
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

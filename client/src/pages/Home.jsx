import React, { useCallback, useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BounceLoader, ClipLoader } from "react-spinners";
import TopNav from "../components/navigation/TopNav";
import SideNav from "../components/navigation/SideNav";
import Main from "../components/middlepage/Main";
import PostCard from "../components/postcard/PostCard";
import SubNavigation from "../components/navigation/SubNavigation";
import Post from "../components/middlepage/Post";
import MobileSidenav from "../components/navigation/MobileSidenav";
import FloatingButton from "../components/navigation/FloatingButton";
import ProfileCard from "../components/rightside/ProfileCard";
import AssetsCard from "../components/rightside/AssetsCard";
import FollowersCard from "../components/rightside/FollowersCard";
import { useAppContext } from "../providers/AppProvider";
import {
  bigintToLongAddress,
  bigintToShortStr,
  getUint256CalldataFromBN,
  parseInputAmountToUint256,
} from "../utils/AppUtils";

console.log(parseInputAmountToUint256("0.1", 18));

const Home = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { contract, address } = useAppContext();
  const [users, setUsers] = useState([]);

  const trytransfer = () => {
    const amount = parseInputAmountToUint256("0.0001", 18);
    const receiver =
      "0x0134831e6e2d9ac8fce18327c87b4d5bb7a38f091f8a9dcb2c580675b09fd9dc";
    const myCall = contract.populate("deposit_fee", [receiver, amount]);
    setLoading(true);
    // console.log(contract);
    contract["deposit_fee"](myCall.calldata)
      .then((res) => {
        console.info("successful response", res);
      })
      .catch((err) => {
        console.error("Error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const view_users = () => {
    const myCall = contract.populate("view_all_users", []);
    setLoading(true);
    contract["view_all_users"](myCall.calldata, {
      parseResponse: false,
      parseRequest: false,
    })
      .then((res) => {
        let val = contract.callData.parse("view_all_users", res?.result ?? res);

        setUsers(val);
      })
      .catch((err) => {
        console.error("Error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function getUserName(userId) {
    if (users) {
      const _user = users.find((element) => element.userId == userId);
      console.log(_user);
      return _user;
    }
  }

  // console.log(users);

  const view_posts = () => {
    const myCall = contract.populate("view_posts", []);
    setLoading(true);
    contract["view_posts"](myCall.calldata, {
      parseResponse: false,
      parseRequest: false,
    })
      .then((res) => {
        let val = contract.callData.parse("view_posts", res?.result ?? res);
        // console.info("success")
        // console.info("Successful Response:", val);
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

  const view_posts2 = () => {
    const myCall = contract.populate("view_posts", []);
    const callPromises = [
      contract["view_posts"](myCall.calldata, {
        parseResponse: false,
        parseRequest: false,
      }),
    ];

    setLoading(true);
    Promise.all(callPromises)
      .then((responses) => {
        const results = responses.map((res) => {
          if (!res || !res.result) {
            console.error("Error: Invalid response from contract");
            return null;
          }
          return contract.callData.parse("view_posts", res.result);
        });
        const validResults = results.filter((result) => result !== null);
        if (validResults.length === 0) {
          console.error("Error: No valid responses from contract");
          return;
        }
        const posts = validResults.reduce(
          (acc, result) => [...acc, ...result],
          []
        );
        console.log(posts);
        setPosts(posts.reverse());
      })
      .catch((err) => {
        console.error("Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (contract) {
      view_posts();
      // view_posts2();
      view_users();
    }
  }, [contract]);

  // console.log(contract);
  const handleMobileMenuClick = () => {
    setNavOpen(!navOpen);
    console.log("something is wrong");
    console.log(navOpen);
  };

  const handleButtonClick = () => {
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
    }, 20000);
  };

  return (
    <>
      <TopNav onMobileMenuClick={handleMobileMenuClick} />
      <SideNav />

      {navOpen && <MobileSidenav />}

      <Main>
        <div className="w3-row-padding w3-stretch">
          <div className="w3-col l8">
            <PostCard />
            <br />
            <SubNavigation
              borderData={[
                { linkName: "following" },
                { linkName: "Hot" },
                { linkName: "New" },
                { linkName: "explore" },
              ]}
            />

            {loading ? (
              <div className="w3-center">
                <ClipLoader loading={loading} color="#2196F3" size={50} />
              </div>
            ) : (
              <div>
                <br />
                {(posts &&
                  posts.map(
                    ({
                      postId,
                      caller,
                      content,
                      likes,
                      comments,
                      shares,
                      images,
                      zuri_points,
                    }) => {
                      const _account_address = bigintToLongAddress(caller);
                      const great_user = getUserName(_account_address);

                      if (great_user) {
                        const _readable_username = bigintToShortStr(
                          great_user.username
                        );
                        console.log(comments.toString());

                        return (
                          <Post
                            key={postId}
                            postId={bigintToShortStr(postId)}
                            images={images.split(" ")}
                            content={content}
                            username={_readable_username}
                            comments={comments.toString()}
                            profile_pic={great_user.profile_pic}
                            likes={likes.toString()}
                            shares={shares.toString()}
                            zuri_points={zuri_points.toString()}
                          />
                        );
                      }
                    }
                  )) || <Skeleton />}
                <button onClick={handleButtonClick} disabled={loading}>
                  {loading ? <BounceLoader size={20} /> : "Click Me"}
                </button>
              </div>
            )}
          </div>

          <div className="w3-col l4 w3-hide-small">
            {address && <ProfileCard />}
            <br />

            <AssetsCard />
            <br />
            <FollowersCard />
          </div>
        </div>
        <FloatingButton />
      </Main>
    </>
  );
};

export default Home;

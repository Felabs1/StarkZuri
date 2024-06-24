import React, { useCallback, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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

const Home = () => {
  const [navOpen, setNavOpen] = useState(false);
  const handleMobileMenuClick = () => {
    setNavOpen(!navOpen);
    console.log("something is wrong");
    console.log(navOpen);
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
            <div>
              <br />
              {<Post /> || <Skeleton />}
            </div>
          </div>

          <div className="w3-col l4 w3-hide-small">
            {<ProfileCard /> || <Skeleton count={10} />}
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

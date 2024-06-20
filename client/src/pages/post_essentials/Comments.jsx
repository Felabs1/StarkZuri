import React, { useState } from "react";
import TopNav from "../../components/navigation/TopNav";
import SideNav from "../../components/navigation/SideNav";
import Main from "../../components/middlepage/Main";
import Post from "../../components/middlepage/Post";
import MobileSidenav from "../../components/navigation/MobileSidenav";
import FloatingButton from "../../components/navigation/FloatingButton";
import ProfileCard from "../../components/rightside/ProfileCard";
import AssetsCard from "../../components/rightside/AssetsCard";
import FollowersCard from "../../components/rightside/FollowersCard";

const Comments = () => {
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
            <Post />
          </div>
          <div className="w3-col l4 w3-hide-small">
            <br />
            <FollowersCard />
          </div>
        </div>
      </Main>
    </>
  );
};

export default Comments;

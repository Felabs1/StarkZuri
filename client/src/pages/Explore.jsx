import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import TopNav from "../components/navigation/TopNav";
import SideNav from "../components/navigation/SideNav";
import Main from "../components/middlepage/Main";
import MobileSidenav from "../components/navigation/MobileSidenav";
import FloatingButton from "../components/navigation/FloatingButton";
import ProfileCard from "../components/rightside/ProfileCard";
import AssetsCard from "../components/rightside/AssetsCard";
import FollowersCard from "../components/rightside/FollowersCard";
import ExploreHeader from "../components/middlepage/ExploreHeader";
import ExploreSubHeader from "../components/middlepage/ExploreSubHeader";
import FeaturedCommunityCard from "../components/middlepage/FeaturedCommunityCard";
import PopularCard from "../components/middlepage/PopularCard";
import { useAppContext } from "../providers/AppProvider";

const Explore = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { contract, address } = useAppContext();
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
        <div className="w3-row-padding w3-stretch">
          <div className="w3-col l8">
            <ExploreHeader />
            <ExploreSubHeader name="Featured Community" />
            <FeaturedCommunityCard />
            <ExploreSubHeader name="Popular" />
            <PopularCard />
            <ExploreSubHeader name="recent" />
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
    </div>
  );
};

export default Explore;

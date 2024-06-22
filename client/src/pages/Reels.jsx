import React, { useState } from "react";
import TopNav from "../components/navigation/TopNav";
import SideNav from "../components/navigation/SideNav";
import Main from "../components/middlepage/Main";
import MobileSidenav from "../components/navigation/MobileSidenav";
import ReelComponent from "../components/middlepage/ReelComponent";
import ModalContainer from "../components/modal/ModalContainer";

const Reels = () => {
  const [navOpen, setNavOpen] = useState(false);
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
        <ReelComponent />
        <ModalContainer>hello world</ModalContainer>
      </Main>
    </div>
  );
};

export default Reels;

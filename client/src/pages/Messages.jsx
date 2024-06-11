import React, { useState } from "react";
import TopNav from "../components/navigation/TopNav";
import SideNav from "../components/navigation/SideNav";
import Main from "../components/middlepage/Main";
import MobileSidenav from "../components/navigation/MobileSidenav";
import ContactNavigation from "../components/navigation/ContactNavigation";

const Messages = () => {
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
        <div className={`w3-row-padding w3-stretch`}>
          <div className={`w3-col l3`}>
            <ContactNavigation />
          </div>
          <div className={`w3-col l6`}>chat box</div>
          <div className={`w3-col l3`}>chat details</div>
        </div>
      </Main>
    </div>
  );
};

export default Messages;

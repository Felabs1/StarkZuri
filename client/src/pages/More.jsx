import React, { useState } from "react";
import TopNav from "../components/navigation/TopNav";
import SideNav from "../components/navigation/SideNav";
import Main from "../components/middlepage/Main";
import MobileSidenav from "../components/navigation/MobileSidenav";
const More = () => {
  const [navOpen, setNavOpen] = useState(false);
  const handleMobileMenuClick = () => {
    setNavOpen(!navOpen);
    console.log("something is wrong");
    console.log(navOpen);
  };

  // localhost d the buisn
  return (
    <div>
      <TopNav onMobileMenuClick={handleMobileMenuClick} />
      <SideNav />

      {navOpen && <MobileSidenav />}

      <Main></Main>
    </div>
  );
};

export default More;

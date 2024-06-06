import React from "react";
import TopNav from "../components/navigation/TopNav";
import SideNav from "../components/navigation/SideNav";
import Main from "../components/middlepage/Main";
import PostCard from "../components/postcard/PostCard";

const Home = () => {
  return (
    <>
      <TopNav />
      <SideNav />
      <Main>
        <div className="w3-row-padding w3-stretch">
          <div className="w3-col l8">
            <PostCard />
          </div>
          <div className="w3-col l4">something</div>
        </div>
      </Main>
    </>
  );
};

export default Home;

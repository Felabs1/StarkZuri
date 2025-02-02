import React from "react";
import CommunityPostCard from "../CommunityPostCard";
import Post from "../../../components/middlepage/Post";
import crystals from "../../../assets/crystals.jpg";

const CommunityPosts = () => {
  return (
    <>
      <CommunityPostCard />
      <Post images={[crystals]} profile_pic={crystals} />
    </>
  );
};

export default CommunityPosts;

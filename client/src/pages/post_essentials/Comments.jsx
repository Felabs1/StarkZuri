import React, { useState, useEffect } from "react";
import TopNav from "../../components/navigation/TopNav";
import SideNav from "../../components/navigation/SideNav";
import Main from "../../components/middlepage/Main";
import Post from "../../components/middlepage/Post";
import MobileSidenav from "../../components/navigation/MobileSidenav";
import FloatingButton from "../../components/navigation/FloatingButton";
import ProfileCard from "../../components/rightside/ProfileCard";
import AssetsCard from "../../components/rightside/AssetsCard";
import FollowersCard from "../../components/rightside/FollowersCard";
import CommentContainer from "../../components/comment/CommentContainer";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../providers/AppProvider";
import { bigintToLongAddress, bigintToShortStr } from "../../utils/AppUtils";

const Comments = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { id } = useParams();
  const { contract } = useAppContext();
  const [users, setUsers] = useState();
  const [posts, setPosts] = useState({});
  const [username, setUsername] = useState();
  const [content, setContent] = useState();
  const [images, setImages] = useState();
  const [shares, setShares] = useState();
  const [likes, setLikes] = useState();
  const [comments, setComments] = useState();
  const [singlePost, setSinglePost] = useState(null);
  const [loading, setLoading] = useState();
  const [commentList, setCommentList] = useState();

  const handleMobileMenuClick = () => {
    setNavOpen(!navOpen);
    console.log("something is wrong");
    console.log(navOpen);
  };

  const view_post = () => {
    // console.log(id);
    const myCall = contract.populate("view_post", [id]);
    setLoading(true);
    contract["view_post"](myCall.calldata, {
      parseResponse: false,
      parseRequest: false,
    })
      .then((res) => {
        let val = contract.callData.parse("view_post", res?.result ?? res);
        console.log(val);
        setPosts(val);
        // console.log(val);
      })
      .catch((err) => {
        console.error("Error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(posts);

  useEffect(() => {
    if (contract) {
      view_post();
    }
  }, [contract]);
  // view_post();

  // console.log(commentList);
  return (
    <>
      <TopNav onMobileMenuClick={handleMobileMenuClick} />
      <SideNav />

      {navOpen && <MobileSidenav />}

      <Main>
        <div className="w3-row-padding w3-stretch">
          <div className="w3-col l8">
            <h4>Comments</h4>
            {posts && (
              <Post
                content={posts.content}
                comments={posts.comments?.toString()}
                likes={posts.likes?.toString()}
                shares={posts.shares?.toString()}
                zuri_points={posts.zuri_points?.toString()}
                userAddress={bigintToLongAddress(posts.caller)}
              />
            )}
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

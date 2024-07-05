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
  const [posts, setPosts] = useState();
  const [username, setUsername] = useState();
  const [content, setContent] = useState();
  const [images, setImages] = useState();
  const [shares, setShares] = useState();
  const [likes, setLikes] = useState();
  const [comments, setComments] = useState();
  const [singlePost, setSinglePost] = useState(null);
  const [loading, setLoading] = useState();
  const [commentList, setCommentList] = useState();

  const view_comment_list = (commentId) => {
    if (contract) {
      const myCall = contract.populate("view_comments", [commentId]);
      setLoading(true);
      contract["view_comments"](myCall.calldata, {
        parseResponse: false,
        parseRequest: false,
      })
        .then((res) => {
          let val = contract.callData.parse(
            "view_comments",
            res?.result ?? res
          );
          console.log(val);
          setCommentList(val);
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const view_users = () => {
    setLoading(true);
    if (contract) {
      const myCall = contract.populate("view_all_users", []);

      contract["view_all_users"](myCall.calldata, {
        parseResponse: false,
        parseRequest: false,
      })
        .then((res) => {
          let val = contract.callData.parse(
            "view_all_users",
            res?.result ?? res
          );

          setUsers(val);
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  function getPost(postId) {
    if (posts) {
      const _post = posts.find(
        (element) => element.postId == postId.toString()
      );
      // console.log(_post);
      let caller = _post.caller;
      let user = getUserName(bigintToLongAddress(caller));
      // console.log(user.username);
      setUsername(bigintToShortStr(user.username));
      setContent(_post.content);
      setImages(_post.images);
      setShares(_post.shares.toString());
      setLikes(_post.likes.toString());
      setComments(_post.comments.toString());

      return _post;
    }
  }

  // getPost(3);

  function getUserName(userId) {
    if (users) {
      const _user = users.find((element) => element.userId == userId);
      console.log(_user);
      return _user;
    }
  }

  const view_posts = () => {
    setLoading(true);
    if (contract) {
      const myCall = contract.populate("view_posts", []);

      contract["view_posts"](myCall.calldata, {
        parseResponse: false,
        parseRequest: false,
      })
        .then((res) => {
          let val = contract.callData.parse("view_posts", res?.result ?? res);
          // console.info("success")
          // console.info("Successful Response:", val);
          console.log(val);
          setPosts(val);
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
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

  const handleMobileMenuClick = () => {
    setNavOpen(!navOpen);
    console.log("something is wrong");
    console.log(navOpen);
  };

  useEffect(() => {
    view_comment_list(id);
  }, []);

  useEffect(() => {
    if (contract) {
      view_posts2();
      view_users();
      // getPost(id);
    }
  }, [contract]);

  useEffect(() => {
    getPost(id);
  }, [contract]);

  // console.log(commentList);
  return (
    <>
      <TopNav onMobileMenuClick={handleMobileMenuClick} />
      <SideNav />

      {navOpen && <MobileSidenav />}

      <Main>
        <div className="w3-row-padding w3-stretch">
          <div className="w3-col l8">
            <Post
              postId={id}
              username={username && username}
              likes={likes && likes.toString()}
              images={images && images.split(" ")}
              comments={comments && comments.toString()}
              shares={shares && shares}
            />
            <h4>Comments</h4>
            {commentList &&
              commentList.map(
                ({ caller, commentId, content, likes, postId, replies }) => {
                  const user = getUserName(bigintToLongAddress(caller));
                  console.log(user);
                  console.log(likes.toString());
                  return (
                    <CommentContainer
                      content={content && content}
                      profilePic={user && user.profile_pic}
                      username={user && bigintToShortStr(user.username)}
                      likes={likes && likes.toString()}
                    />
                  );
                }
              )}
            {/* <CommentContainer containsThread={true} /> */}
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

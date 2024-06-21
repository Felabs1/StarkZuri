import React from "react";
import CommentContainer from "./CommentContainer";

const InnerThread = () => {
  return (
    <div>
      <CommentContainer />
      <CommentContainer />
      <CommentContainer />
    </div>
  );
};

export default InnerThread;

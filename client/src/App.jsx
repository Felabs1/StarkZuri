import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "w3-css/w3.css";

import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Explore from "./pages/Explore";
import Messages from "./pages/Messages";
import More from "./pages/More";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Reels from "./pages/Reels";
import Wallet from "./pages/Wallet";
import Comments from "./pages/post_essentials/Comments";
import Skeleton from "./components/skeleton/Skeleton";
import AppProvider from "./providers/AppProvider";
import NewCommunity from "./pages/community_essentials/NewCommunity";
import NewVideo from "./components/middlepage/video_essentials/NewVideo";
import UserProfile from "./pages/profile_essentials/UserProfile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/more" element={<More />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userAddress" element={<UserProfile />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/post/:id" element={<Comments />} />
            <Route path="/reels/new-reel" element={<NewVideo />} />
            <Route
              path="/explore/new-community"
              element={<NewCommunity />}
            ></Route>
          </Routes>
        </Router>
      </AppProvider>
    </>
  );
}

export default App;

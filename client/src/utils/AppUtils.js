import {
  faSearch,
  faHome,
  faHashtag,
  faBell,
  faMessage,
  faBookmark,
  faList,
  faBitcoinSign,
  faUser,
  faWallet,
  faListDots,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";

export const sideNavigations = [
  {
    navName: "Home",
    icon: faHome,
    to: "/",
  },
  { navName: "Explore", icon: faHashtag, to: "/explore" },
  { navName: "Notifications", icon: faBell, to: "/notifications" },
  { navName: "Messages", icon: faMessage, to: "/messages" },
  { navName: "reels", icon: faVideoCamera, to: "/reels" },
  { navName: "MarketPlace", icon: faBitcoinSign, to: "/marketplace" },
  { navName: "profile", icon: faUser, to: "/profile" },
  { navName: "Wallet", icon: faWallet, to: "/wallet" },
  { navName: "More", icon: faListDots, to: "/more" },
];

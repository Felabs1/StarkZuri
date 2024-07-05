import { BigNumber } from "bignumber.js";
import { shortString } from "starknet";
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
  // { navName: "Messages", icon: faMessage, to: "/messages" },
  { navName: "reels", icon: faVideoCamera, to: "/reels" },

  { navName: "profile", icon: faUser, to: "/profile" },
  { navName: "Wallet", icon: faWallet, to: "/wallet" },
  { navName: "More", icon: faListDots, to: "/more" },
];

export function bigintToShortStr(bigintstr) {
  try {
    if (!bigintstr) return "";
    const bn = BigNumber(bigintstr);
    const hex_sentence = `0x` + bn.toString(16);
    return shortString.decodeShortString(hex_sentence);
  } catch (error) {
    return bigintstr;
  }
}

export function convertToReadableNumber(string) {
  const num = BigNumber(string).toString(16);
  const hex_sentence = `0x` + num;
  return shortString.decodeShortString(hex_sentence);
}

export function bigintToLongAddress(bigintstr) {
  try {
    if (!bigintstr) return "";
    const bn = BigNumber(bigintstr);
    const hex_sentence = `0x` + bn.toString(16);
    return hex_sentence;
  } catch (error) {
    return bigintstr;
  }
}

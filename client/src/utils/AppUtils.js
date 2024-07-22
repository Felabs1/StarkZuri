import { BigNumber } from "bignumber.js";
import { shortString, num, uint256 } from "starknet";
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
  // { navName: "Wallet", icon: faWallet, to: "/wallet" },
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

export const getUint256CalldataFromBN = (bn) => uint256.bnToUint256(bn);

export const parseInputAmountToUint256 = (input, decimals) =>
  getUint256CalldataFromBN(parseUnits(input, decimals).value);

export const parseUnits = (value, decimals) => {
  let [integer, fraction = ""] = value.split(".");

  const negative = integer.startsWith("-");
  if (negative) {
    integer = integer.slice(1);
  }

  // If the fraction is longer than allowed, round it off
  if (fraction.length > decimals) {
    const unitIndex = decimals;
    const unit = Number(fraction[unitIndex]);

    if (unit >= 5) {
      const fractionBigInt = BigInt(fraction.slice(0, decimals)) + BigInt(1);
      fraction = fractionBigInt.toString().padStart(decimals, "0");
    } else {
      fraction = fraction.slice(0, decimals);
    }
  } else {
    fraction = fraction.padEnd(decimals, "0");
  }

  const parsedValue = BigInt(`${negative ? "-" : ""}${integer}${fraction}`);

  return {
    value: parsedValue,
    decimals,
  };
};

export function timeAgo(timestamp) {
  const now = Date.now();
  const timeDifference = now - timestamp;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  }
  if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }
  if (weeks > 0) {
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }
  if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }
  if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }
  if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  }
  if (seconds > 0) {
    return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
  }

  return "just now";
}

export function multilineToSingleline(multilineString) {
  return multilineString.replace(/\n/g, "<br />");
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  return date.toLocaleDateString("en-US", options);
}

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

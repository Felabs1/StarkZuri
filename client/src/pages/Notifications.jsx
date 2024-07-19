import React, { useEffect, useState } from "react";
import TopNav from "../components/navigation/TopNav";
import SideNav from "../components/navigation/SideNav";
import Main from "../components/middlepage/Main";
import MobileSidenav from "../components/navigation/MobileSidenav";
import ProfileCard from "../components/rightside/ProfileCard";
import AssetsCard from "../components/rightside/AssetsCard";
import FollowersCard from "../components/rightside/FollowersCard";
import FloatingButton from "../components/navigation/FloatingButton";
import NotificationsCard from "../components/middlepage/NotificationsCard";
import { useAppContext } from "../providers/AppProvider";
import {
  bigintToLongAddress,
  bigintToShortStr,
  formatDate,
} from "../utils/AppUtils";

const Notifications = () => {
  const { contract, address } = useAppContext();
  const [navOpen, setNavOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const view_user = () => {
    const myCall = contract.populate("view_user", [address]);
    setLoading(true);
    contract["view_user"](myCall.calldata, {
      parseResponse: false,
      parseRequest: false,
    })
      .then((res) => {
        let val = contract.callData.parse("view_user", res?.result ?? res);
        console.log(val);
        setUser(val);
      })
      .catch((err) => {
        console.error("Error: ", err);
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
    if (contract && address) {
      view_user();
    }
  }, [contract]);
  return (
    <div>
      <TopNav onMobileMenuClick={handleMobileMenuClick} />
      <SideNav />

      {navOpen && <MobileSidenav />}

      <Main>
        <div className="w3-row-padding w3-stretch">
          <div className="w3-col l8">
            <br />
            <NotificationsCard />
          </div>
          <div className="w3-col l4 w3-hide-small">
            {address && user ? (
              <ProfileCard
                about={user.about}
                name={bigintToShortStr(user.name)}
                username={bigintToShortStr(user.username)}
                no_following={user.number_following.toString()}
                no_of_followers={user.no_of_followers.toString()}
                profile_pic={user.profile_pic}
                cover_photo={user.cover_photo}
                zuri_points={user.zuri_points.toString()}
                date_registered={formatDate(
                  user.date_registered.toString() * 1000
                )}
              />
            ) : (
              ""
            )}
            <br />

            <AssetsCard />
            <br />
            <FollowersCard />
          </div>
        </div>
        <FloatingButton />
      </Main>
    </div>
  );
};

export default Notifications;

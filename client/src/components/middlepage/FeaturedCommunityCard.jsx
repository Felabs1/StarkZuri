import React, { useState, useEffect } from "react";
import styles from "./FeaturedCommunityCard.module.css";
import virtual_reality_image from "../../assets/virtual_reality.jpg";
import stark from "../../assets/ST4.png";
import computer_science from "../../assets/computer_science.jpg";
import profile_4 from "../../assets/profile3.jpg";
import { useAppContext } from "../../providers/AppProvider";
import { bigintToShortStr } from "../../utils/AppUtils";

const FeaturedCommunityCard = () => {
  const { contract } = useAppContext();
  const [communities, setCommunities] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const viewCommunities = () => {
      const myCall = contract.populate("list_communities", []);
      setLoading(true);
      contract["list_communities"](myCall.calldata, {
        parseResponse: false,
        parseRequest: false,
      })
        .then((res) => {
          let val = contract.callData.parse(
            "list_communities",
            res?.result ?? res
          );
          console.log(val);
          setCommunities(val);
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (contract) {
      viewCommunities();
    }
  }, [contract]);

  return (
    <div
      className={`${styles.featured_community_card} w3-row-padding w3-stretch`}
    >
      {communities &&
        communities.map(
          ({
            community_id,
            community_admin,
            community_name,
            description,
            members,
            online_members,
            profile_image,
            cover_image,
          }) => {
            return (
              <div className="w3-col l6">
                <div
                  className={` ${styles.community_card}`}
                  style={{ backgroundImage: `url(${cover_image})` }}
                >
                  <div className={styles.wave}>
                    <div
                      className={styles.profile_pic}
                      style={{ backgroundImage: `url(${profile_image})` }}
                    ></div>
                    <h4>{bigintToShortStr(community_name)}</h4>
                    <p>{bigintToShortStr(description)}</p>
                    <br />
                    <div className={styles.footer}>
                      <div className={styles.online}>
                        {online_members.toString()} online
                      </div>

                      <div className={styles.members}>
                        {members.toString()} Members
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}

      {/* <div className="w3-col l6">
        <div
          className={` ${styles.community_card}`}
          style={{ backgroundImage: `url(${computer_science})` }}
        >
          <div className={styles.wave}>
            <div
              className={styles.profile_pic}
              style={{ backgroundImage: `url(${stark})` }}
            ></div>
            <h4>Computer science</h4>
            <p>A community for novice and VR, Regular and friendly chat</p>
            <br />
            <div className={styles.footer}>
              <div className={styles.online}>890 online</div>

              <div className={styles.members}>234,567 Members</div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default FeaturedCommunityCard;

import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-loading-skeleton/dist/skeleton.css";
import { BeatLoader } from "react-spinners";
import TopNav from "../../components/navigation/TopNav";
import SideNav from "../../components/navigation/SideNav";
import Main from "../../components/middlepage/Main";
import styles from "./NewCommunity.module.css";
import { useAppContext } from "../../providers/AppProvider";
import { uploadToIPFS } from "../../Infura";

const NewCommunity = () => {
  const communityName = useRef();
  const description = useRef();
  const profileImage = useRef();
  const coverImage = useRef();
  const [profile, setProfile] = useState("");
  const [cover, setCover] = useState("");
  const { contract, address, handleWalletConnection } = useAppContext();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const _communityName = communityName.current.value;
    const _description = description.current.value;
    if (address) {
      const myCall = contract.populate("create_community", [
        _communityName,
        _description,
        profile,
        cover,
      ]);
      setLoading(true);
      contract["create_community"](myCall.calldata)
        .then((res) => {
          console.info("Successful response", res);
          toast.info("community created successfully!", {
            className: styles.toast_message,
          });
        })

        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      handleWalletConnection();
    }
  };

  const handleProfileUpload = async () => {
    console.log(profileImage.current.files);
    const _profile = profileImage.current.files[0];
    setLoading(true);
    const response = await uploadToIPFS(_profile);
    if (response) {
      setLoading(false);
      console.log(response);
      setProfile(response);
    }
  };

  const handleCoverUpload = async () => {
    const _cover = coverImage.current.files[0];
    setLoading(true);
    const response = await uploadToIPFS(_cover);
    console.log(response);
    if (response) {
      setLoading(false);
      setCover(response);
    }
  };

  return (
    <div>
      <ToastContainer />
      <TopNav />
      <SideNav />
      <Main>
        <div className={`${styles.panel}`}>
          <span className="w3-large">New Community</span>

          <hr />
          <div className="w3-row-padding w3-stretch">
            <div className="w3-col l6">
              <label className="w3-text-white">Community Name</label>
              <input
                ref={communityName}
                className="w3-input w3-border w3-round w3-transparent w3-text-white"
              />
            </div>
            <div className="w3-col l6">
              <label className="w3-text-white">Description</label>
              <input
                ref={description}
                className="w3-input w3-border w3-round w3-transparent w3-text-white"
              />
            </div>
            <div className="w3-col l6">
              <label className="w3-text-white">profile image</label>
              <input
                type="file"
                ref={profileImage}
                onChange={handleProfileUpload}
                className="w3-input w3-border w3-round w3-transparent w3-text-white"
              />
            </div>
            <div className="w3-col l6">
              <label className="w3-text-white">Cover image</label>
              <input
                ref={coverImage}
                onChange={handleCoverUpload}
                type="file"
                className="w3-input w3-border w3-round w3-transparent w3-text-white"
              />
            </div>
          </div>
          <br />
          <div className="w3-center">
            {loading ? (
              <button className="w3-button">
                <BeatLoader loading={loading} color="#fff" size={10} />
              </button>
            ) : (
              <button
                className="w3-button w3-border w3-round"
                onClick={handleSubmit}
              >
                Create
              </button>
            )}
          </div>
        </div>
      </Main>
    </div>
  );
};

export default NewCommunity;

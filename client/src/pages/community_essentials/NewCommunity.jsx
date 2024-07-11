import React, { useRef, useState } from "react";
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
    const response = await uploadToIPFS(_profile);
    console.log(response);
    setProfile(response);
    // if (!_profile) {
    //   alert("please input file for upload");
    // } else {
    //   const formdata = new FormData();
    //   formdata.append("file", _profile);
    //   try {
    //     const response = await fetch("http://localhost:3001/upload", {
    //       method: "POST",
    //       body: formdata,
    //     });
    //     if (response.ok) {
    //       const result = await response.json();
    //       console.log("profile image uploaded successfully");
    //       setProfile(result.url);
    //       console.log(result);
    //     } else {
    //       console.log("image upload failed");
    //     }
    //   } catch (error) {
    //     console.error("Error", error);
    //     alert("an error occured while uploading the image");
    //   }
    // }
  };

  const handleCoverUpload = async () => {
    const _cover = coverImage.current.files[0];
    const response = await uploadToIPFS(_cover);
    console.log(response);
    setCover(response);
    // if (!_cover) {
    //   alert("please input file for upload");
    // } else {
    //   const formdata = new FormData();
    //   formdata.append("file", _cover);
    //   try {
    //     const response = await fetch("http://localhost:3001/upload", {
    //       method: "POST",
    //       body: formdata,
    //     });
    //     if (response.ok) {
    //       const result = await response.json();
    //       console.log("profile image uploaded successfully");
    //       setCover(result.url);
    //       console.log(result);
    //     } else {
    //       console.log("image upload failed");
    //     }
    //   } catch (error) {
    //     console.error("Error", error);
    //     alert("an error occured while uploading the image");
    //   }
    // }
  };

  return (
    <div>
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
            <button
              className="w3-button w3-border w3-round"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      </Main>
    </div>
  );
};

export default NewCommunity;

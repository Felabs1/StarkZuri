import React, { useRef, useState } from "react";
import TopNav from "../../navigation/TopNav";
import SideNav from "../../navigation/SideNav";
import Main from "../Main";
import styles from "./NewVideo.module.css";
import { useAppContext } from "../../../providers/AppProvider";
import { uploadToIPFS } from "../../../Infura";

const NewVideo = () => {
  const [uploadedVideo, setUploadedVideo] = useState(false);
  const { contract, address } = useAppContext();
  const [loading, setLoading] = useState(false);
  const uploadableVideo = useRef();
  const description = useRef();

  const handleSubmit = () => {
    const _description = description.current.value;
    if (address) {
      const myCall = contract.populate("create_reel", [
        _description,
        uploadedVideo,
      ]);
      setLoading(true);
      contract["create_reel"](myCall.calldata)
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

  const handleVideoUpload = async () => {
    const video = uploadableVideo.current.files[0];
    setLoading(true);
    const response = await uploadToIPFS(video);
    if (response) {
      console.log(response);

      setLoading(false);
      setUploadedVideo(response);
    }
  };

  return (
    <div>
      <TopNav />
      <SideNav />
      <Main>
        <div className={styles.panel}>
          <span className="w3-large">New Video</span>
          <hr />
          <div className="w3-row-padding w3-stretch">
            <div className="w3-col l6">
              <label className="w3-text-white">Description</label>
              <input
                ref={description}
                className="w3-input w3-border w3-round w3-transparent w3-text-white"
              />
            </div>
            <div className="w3-col l6">
              <label className="w3-text-white">video</label>
              <input
                type="file"
                ref={uploadableVideo}
                onChange={handleVideoUpload}
                className="w3-input w3-border w3-round w3-transparent w3-text-white"
              />
            </div>
          </div>
          <br />
          <br />
          <div className="w3-center">
            <button
              onClick={handleSubmit}
              className="w3-button w3-round w3-blue"
            >
              create reel
            </button>
          </div>
        </div>
      </Main>
    </div>
  );
};

export default NewVideo;

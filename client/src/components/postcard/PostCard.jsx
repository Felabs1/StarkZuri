import React, { useRef, useState } from "react";
import styles from "./PostCard.module.css";
import searchLogo from "../../assets/ST4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faImage,
  faVideo,
  faChartBar,
  faGlobe,
  faBucket,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAppContext } from "../../providers/AppProvider";
import { uploadToIPFS } from "../../Infura";

const PostCard = () => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { contract, address } = useAppContext();
  const [postmedia, setPostmedia] = useState([]);
  const [loading, setLoading] = useState(false);

  // two states to store the files and the urls
  const [fileURLs, setFileURLs] = useState(null);
  const [imagesValue, setImagesValue] = useState([]);

  const postContent = useRef();

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmitForm = () => {
    const _postContent = postContent.current.value;
    const _postmedia = postmedia.join(" ");
    console.log(_postmedia);
    console.log(_postContent);

    const myCall = contract.populate("create_post", [
      _postContent,
      fileURLs.join(" "),
    ]);
    setLoading(true);
    // console.log(contract);
    contract["create_post"](myCall.calldata)
      .then((res) => {
        console.info("successful response", res);
      })
      .catch((err) => {
        console.error("Error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
    handleUpload();
  };

  const OnChangeMFile = async (e) => {
    // Placeholder logic: Upload files to IPFS
    const uploadedUrls = [];
    const selectedFiles = e.target.files;

    for (const file of selectedFiles) {
      const response = await uploadToIPFS(file); // Your actual IPFS upload function
      uploadedUrls.push(response);
    }

    // Placeholder logic: Handle changes, such as updating URLs
    console.log("Uploaded URLs:", uploadedUrls);
    setFileURLs(uploadedUrls); // Assuming you have a state to store the URLs
  };

  const handleUpload = async () => {
    const formData = new FormData();
    const images = fileInputRef.current.files;
    // console.log(images);

    // append each selected file to the form data object
    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
    }

    // Log the contents of formData
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1].name); // Logs the field name and file name
    }
    // console.log(formData);

    try {
      // const response = await axios.post(
      //   "http://localhost:3001/upload-multiple",
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //     // track upload progress
      //     onUploadProgress: (progressEvent) => {
      //       const progress = Math.round(
      //         (progressEvent.loaded * 100) / progressEvent.total
      //       );
      //       setUploadProgress(progress);
      //     },
      //   }
      // );
      // console.log("upload successful", response.data);
      // const urls = response.data;
      // console.log(response.data.urls);
      // setPostmedia(response.data.urls);
      // setSelectedFiles([]);
    } catch (error) {
      console.error("Error uploading images: ", error);
    }
  };
  return (
    <div className={styles.postcard_border}>
      <div className={styles.form_container}>
        <img src={searchLogo} className={styles.logo_image} alt="image" />
        <input
          className="w3-input"
          ref={postContent}
          placeholder="what's on your mind"
        />
        <button className="w3-button" onClick={handleSubmitForm}>
          Post
        </button>
      </div>
      <br />
      <div className={styles.form_helpers_holder}>
        <div
          className={styles.form_helpers}
          style={{ backgroundColor: "transparent" }}
        >
          {/* <FontAwesomeIcon icon={faSearch} /> */}
        </div>
        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          onChange={OnChangeMFile}
          multiple
          style={{ display: "none" }}
        />

        <div className={styles.form_helpers} onClick={handleFileClick}>
          <FontAwesomeIcon icon={faImage} />
        </div>
        {uploadProgress > 0 && <span>upload progress: {uploadProgress}%</span>}
        <div className={styles.form_helpers} onClick={handleFileClick}>
          <FontAwesomeIcon icon={faVideo} />
        </div>
        {/* <div className={styles.form_helpers}>
          <FontAwesomeIcon icon={faChartBar} />
        </div>
        <div className={styles.form_helpers}>
          <FontAwesomeIcon icon={faGlobe} />
        </div>{" "}
        <div className={styles.form_helpers}>
          <FontAwesomeIcon icon={faBucket} />
        </div> */}
      </div>
    </div>
  );
};

export default PostCard;

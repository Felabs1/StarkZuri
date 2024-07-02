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

const PostCard = () => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    // append each selected file to the form data object
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/upload-images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // track upload progress
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );
      console.log("upload successful", response.data);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error uploading images: ", error);
    }
  };
  return (
    <div className={styles.postcard_border}>
      <div className={styles.form_container}>
        <img src={searchLogo} className={styles.logo_image} alt="image" />
        <input className="w3-input" placeholder="what's on your mind" />
        <button className="w3-button">Post</button>
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
          onChange={handleFileChange}
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

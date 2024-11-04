import React, { useState, useRef, useEffect } from "react";
import { Button, Divider, Typography, Menu, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import { useNavigate } from "react-router-dom";
import client from "../../../../utils/client";
import { notifyError, notifySuccess } from "../../../../utils/Helpers";
import ProgressBar from "@ramonak/react-progress-bar";

const Sidebar = () => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [totalSize, setTotalSize] = useState(0); // State to store total file size
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const fetchTotalSize = async () => {
    try {
      const response = await client.post("/get-tot-file-size/");
      setTotalSize(response.data.total_size); // Set the total size from the response
    } catch (error) {
      notifyError("Failed to fetch total upload size");
      console.error(error.message);
    }
  };
  // Fetch total file size on component mount
  useEffect(() => {
    fetchTotalSize();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOptionClick = (option) => {
    if (option === "Upload File") {
      fileInputRef.current.click();
    }
    handleClose();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const formData = new FormData(formRef.current);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    event.preventDefault();
    uploadFiles(formData);
  };

  const uploadFiles = async (formData) => {
    setUploading(true);
    try {
      const response = await client.post("/upload/", formData, {
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total;
          const current = progressEvent.loaded;
          const percentCompleted = Math.floor((current / total) * 100);
          setProgress(percentCompleted);
        },
        headers: {
          Accept: "application/json",
          "Content-Type": undefined,
        },
        withCredentials: true,
      });

      notifySuccess("File(s) uploaded successfully!", response.data);
      fetchTotalSize(); // Refresh total size after upload
    } catch (error) {
      notifyError("Something went wrong");
      console.error(error.message);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleMyDriveClick = () => {
    navigate("/drive/files");
  };

  return (
    <div style={{ width: "250px", padding: "10px" }}>
      <div
        className="flex-col mt-10"
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <img src="/images/logo.png" alt="Drive Logo" height={100} width={100} />
        <h5 style={{ marginLeft: "10px" }} className="poppins-light">
          FileGuard
        </h5>
      </div>

      <Button
        variant="contained"
        style={{
          backgroundColor: "#5A6AFF",
          color: "white",
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
          marginBottom: "20px",
          textTransform: "none",
        }}
        onClick={handleClick}
      >
        + New
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={() => handleMenuOptionClick("Upload File")}>
          Upload File
        </MenuItem>
      </Menu>

      <form
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
        encType="multipart/form-data"
      >
        <input
          type="file"
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </form>

      {uploading && (
        <div style={{ marginBottom: "20px" }}>
          <ProgressBar
            completed={progress}
            height="20px"
            bgColor={progress < 50 ? "#ffcc00" : "#4caf50"}
          />
          <Typography variant="body2" style={{ textAlign: "center" }}>
            {progress < 50 ? "Encrypting the file..." : "Uploading..."}
          </Typography>
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        <Button
          startIcon={<HomeIcon />}
          style={{
            justifyContent: "flex-start",
            width: "100%",
            color: "black",
          }}
        >
          Home
        </Button>
        <Button
          startIcon={<DescriptionIcon />}
          onClick={handleMyDriveClick}
          style={{
            justifyContent: "flex-start",
            width: "100%",
            color: "black",
          }}
        >
          My Drive
        </Button>
        <Button
          startIcon={<PeopleIcon />}
          style={{
            justifyContent: "flex-start",
            width: "100%",
            color: "black",
          }}
        >
          Shared with me
        </Button>
      </div>

      <Divider />
      <div style={{ padding: "10px 0" }}>
        <Button
          startIcon={<CloudQueueIcon />}
          style={{
            justifyContent: "flex-start",
            width: "100%",
            color: "black",
          }}
        >
          Storage
        </Button>
        <Typography variant="body2" style={{ color: "gray", padding: "5px 0" }}>
          {`${(totalSize / (1024 * 1024)).toFixed(2)} MB of 15 GB used`}
        </Typography>
        <div
          style={{
            height: "5px",
            backgroundColor: "#e0e0e0",
            borderRadius: "3px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(totalSize / (15 * 1024 * 1024 * 1024)) * 100}%`,
              height: "100%",
              backgroundColor: "#1a73e8",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

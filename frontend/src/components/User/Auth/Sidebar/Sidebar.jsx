import React, { useState, useRef } from "react";
import { Button, Divider, Typography, Menu, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import { useNavigate } from "react-router-dom";
import client from "../../../../utils/client";
import { notifyError, notifySuccess } from "../../../../utils/Helpers";
import ProgressBar from "@ramonak/react-progress-bar";

const Sidebar = () => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const fileInputRef = useRef(null);
  const formRef = useRef(null); // Reference for the form

  // Handle menu open
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle option click (upload or new folder)
  const handleMenuOptionClick = (option) => {
    if (option === "Upload File") {
      fileInputRef.current.click(); // Open file manager
    }
    handleClose();
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const files = event.target.files; // Get the files from the input
    const formData = new FormData(formRef.current); // Create a FormData object from the form

    // Append each selected file to the FormData object
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]); // Use the same key for multiple files
    }

    // Optionally, prevent form submission if you are handling the file upload here
    event.preventDefault();

    uploadFiles(formData); // Call the function to handle upload
  };

  // Function to upload files
  const uploadFiles = async (formData) => {
    setUploading(true); // Set uploading to true
    try {
      const response = await client.post("/upload/", formData, {
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total;
          const current = progressEvent.loaded;
          const percentCompleted = Math.floor((current / total) * 100);
          setProgress(percentCompleted); // Update progress
        },
        headers: {
          Accept: "application/json",
          "Content-Type": undefined, // or "multipart/form-data" if needed
        },
        withCredentials: true,
      });

      notifySuccess("File(s) uploaded successfully!", response.data);
    } catch (error) {
      notifyError("Something went wrong");
      console.error(error.message);
    } finally {
      setUploading(false); // Reset uploading state after upload
      setProgress(0); // Reset progress after upload is complete
    }
  };

  const handleMyDriveClick = () => {
    navigate("/drive/files");
  };

  return (
    <div style={{ width: "250px", padding: "10px" }}>
      {/* Logo */}
      <div
        className="flex-col mt-10"
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <img src="/images/logo.png" alt="Drive Logo" height={100} width={100} />
        <h5 style={{ marginLeft: "10px" }} className="poppins-light">
          FileGuard
        </h5>
      </div>

      {/* New Button with Menu */}
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

      {/* Menu for New Options */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => handleMenuOptionClick("Upload File")}>
          Upload File
        </MenuItem>
      </Menu>

      {/* Form for file upload */}
      <form
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
        encType="multipart/form-data"
      >
        {/* Invisible file input for file upload */}
        <input
          type="file"
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </form>

      {/* Upload Progress Bar */}
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

      {/* Menu Items */}
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
        <Button
          startIcon={<DeleteIcon />}
          style={{
            justifyContent: "flex-start",
            width: "100%",
            color: "black",
          }}
        >
          Trash
        </Button>
      </div>

      {/* Storage Section */}
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
          6.07 GB of 15 GB used
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
            style={{ width: "40%", height: "100%", backgroundColor: "#1a73e8" }}
          ></div>
        </div>
        <Button
          variant="outlined"
          style={{
            marginTop: "10px",
            textTransform: "none",
            width: "100%",
            color: "#1a73e8",
            borderColor: "#1a73e8",
          }}
        >
          Get more storage
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;

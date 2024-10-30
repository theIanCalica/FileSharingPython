import React, { useState } from "react";
import { Button, Divider, Typography, Menu, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

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
    console.log(`Selected option: ${option}`);
    handleClose();
  };

  return (
    <div
      style={{ width: "250px", padding: "10px", backgroundColor: "#f5f7fa" }}
    >
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
        <MenuItem onClick={() => handleMenuOptionClick("New Folder")}>
          New Folder
        </MenuItem>
      </Menu>

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
          startIcon={<AccessTimeIcon />}
          style={{
            justifyContent: "flex-start",
            width: "100%",
            color: "black",
          }}
        >
          Recent
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

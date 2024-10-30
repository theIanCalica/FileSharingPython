import React from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
const Navbar = () => {
  return (
    <>
      <nav
        style={{
          padding: "10px",
          backgroundColor: "#f1f3f4",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: "20px",
            backgroundColor: "white",
            padding: "5px 15px",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <span
            className="material-icons"
            style={{ marginRight: "8px", color: "gray" }}
          >
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search in Drive"
            style={{
              border: "none",
              outline: "none",
              flexGrow: 1,
              backgroundColor: "transparent",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <HelpOutlineIcon style={{ color: "gray", cursor: "pointer" }} />
          <img
            src="https://images.pexels.com/photos/1759531/pexels-photo-1759531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpg" // Replace this URL with the actual URL for the avatar image
            alt="User Avatar"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;

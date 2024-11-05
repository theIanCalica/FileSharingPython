import React, { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
import client from "../../../../utils/client";
import {
  notifyError,
  notifySuccess,
  logout,
  getProfile,
} from "../../../../utils/Helpers";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const profile = getProfile();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleProfileClick = () => {
    // Handle profile click logic
    console.log("Profile clicked");
  };

  const handleLogoutClick = () => {
    console.log("Logout clicked");
    const url = `${process.env.REACT_APP_API_LINK}/logout/`;
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then(async (result) => {
      try {
        await client.post(url, { withCredentials: true }).then((response) => {
          if (response.status === 200) {
            notifySuccess("Logout Successfully");
            logout();
            navigate("/signin");
          }
        });
      } catch (err) {
        notifyError("Something went wrong.");
        console.error(err);
      }
    });
  };

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
          <div className="mr-5" style={{ position: "relative" }}>
            <img
              src={profile.url}
              alt="User Avatar"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={toggleDropdown} // Toggle dropdown on click
            />
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "40px",
                  right: 0,
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
                  zIndex: 1000,
                  width: "150px",
                }}
              >
                <div
                  onClick={handleProfileClick}
                  style={{
                    padding: "10px 15px",
                    cursor: "pointer",
                    hover: { backgroundColor: "#f0f0f0" },
                  }}
                >
                  Profile
                </div>
                <div
                  onClick={handleLogoutClick}
                  style={{
                    padding: "10px 15px",
                    cursor: "pointer",
                    hover: { backgroundColor: "#f0f0f0" },
                  }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

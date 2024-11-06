import React, { useState, useEffect } from "react";
import { Menu } from "@mui/icons-material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate, NavLink } from "react-router-dom";
import { logout, getUser, getProfile } from "../../../utils/Helpers";
import Swal from "sweetalert2";
import client from "../../../utils/client";
const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const user = getUser();
  const profile = getProfile();
  const handleSearch = () => {
    console.log("Search for:", searchTerm);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    });

    if (result.isConfirmed) {
      try {
        await client.post(`${process.env.REACT_APP_API_LINK}/logout/`);
        logout();
        navigate("/");

        Swal.fire(
          "Logged Out!",
          "You have been logged out successfully.",
          "success"
        );
      } catch (error) {
        // Handle logout failure
        Swal.fire("Error", "Failed to log out. Please try again.", "error");
      }
    }
  };

  return (
    <nav
      className="text-white flex items-center py-2 px-4"
      style={{ backgroundColor: "#FAFAFB" }}
    >
      <div className="flex items-center justify-center">
        {/* Menu Icon */}
        <button onClick={toggleSidebar} className="text-black mr-4">
          <Menu
            style={{ fontSize: "15px" }}
            className="text-gray-400 mb-1 ml-2"
          />
        </button>
      </div>
      <div className="ml-auto flex items-center w-full">
        {/* Right Side Icons */}
        <div className="flex items-center ml-auto space-x-4">
          <NavLink to={"/admin/email"}>
            <button className="text-black">
              <EmailOutlinedIcon style={{ fontSize: "20px" }} />
            </button>
          </NavLink>

          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="text-black flex items-center gap-3"
            >
              <img
                src={profile.url}
                alt="User Profile Pic"
                className="rounded-full w-10 h-10 object-cover"
              />
              <span>{user.first_name + " " + user.last_name}</span>
              <KeyboardArrowDownOutlinedIcon
                className=""
                style={{ fontSize: "15px" }}
              />
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                <NavLink to={"/admin/profile"}>
                  <button className="flex gap-4 px-4 py-3 text-gray-700 justify-between hover:bg-gray-100 w-full text-left">
                    <span className="text-gray-700">Profile</span>
                    <PersonOutlineOutlinedIcon style={{ fontSize: "18px" }} />
                  </button>
                </NavLink>

                <button
                  className="flex gap-4 px-4 py-3 text-gray-700 justify-between hover:bg-gray-100 w-full text-left"
                  onClick={handleLogout}
                >
                  <span className="text-gray-700">Logout</span>
                  <LogoutOutlinedIcon style={{ fontSize: "18px" }} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

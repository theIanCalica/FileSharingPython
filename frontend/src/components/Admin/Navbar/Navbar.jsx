import React, { useState, useEffect } from "react";
import { Menu } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import { getUser } from "../../../Utils/helpers";
import { useNavigate, NavLink } from "react-router-dom";
// import { logout } from "../../../Utils/helpers";
import Swal from "sweetalert2";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  // const user = getUser();

  const handleSearch = () => {
    console.log("Search for:", searchTerm);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        // logout(() => {
        //   navigate("/");
        // });
        Swal.fire(
          "Logged Out!",
          "You have been logged out successfully.",
          "success"
        );
      }
    });
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
        {/* Search */}
        <div
          className="flex items-center h-12 w-80 overflow-hidden"
          style={{ backgroundColor: "#EEF0FA" }}
        >
          <button
            onClick={handleSearch}
            className="text-gray-700 p-2 flex items-center justify-center"
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: "#EEF0FA",
            }}
          >
            <SearchIcon
              style={{ fontSize: "15px" }}
              className="text-gray-400"
            />
          </button>
          <input
            type="text"
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none border-none w-52 pr-3 py-2 flex-grow text-sm text-black"
            placeholder="Search..."
            style={{ backgroundColor: "#EEF0FA" }}
          />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center ml-auto space-x-4">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-black flex gap-1 items-center"
            >
              <img
                src={
                  selectedLanguage === "English"
                    ? "https://flagcdn.com/h20/um.png"
                    : "https://flagcdn.com/h20/ph.png"
                }
                srcSet={
                  selectedLanguage === "English"
                    ? "https://flagcdn.com/h40/um.png 2x, https://flagcdn.com/h60/um.png 3x"
                    : "https://flagcdn.com/h40/ph.png 2x, https://flagcdn.com/h60/ph.png 3x"
                }
                height="20"
                alt={selectedLanguage}
                className="mr-3"
              />
              <span className="text-sm">{selectedLanguage}</span>
              <span className="ml-1">&#9662;</span> {/* Down arrow */}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-300 rounded shadow-lg">
                <button
                  onClick={() => handleLanguageChange("English")}
                  className="flex gap-4 px-4 py-3 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <img
                    src="https://flagcdn.com/h20/um.png"
                    srcSet="https://flagcdn.com/h40/um.png 2x, https://flagcdn.com/h60/um.png 3x"
                    height="20"
                    alt="English"
                  />
                  English
                </button>

                <button
                  onClick={() => handleLanguageChange("Tagalog")}
                  className="flex gap-4 px-4 py-3 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <img
                    src="https://flagcdn.com/h20/ph.png"
                    srcSet="https://flagcdn.com/h40/ph.png 2x, https://flagcdn.com/h60/ph.png 3x"
                    height="20"
                    alt="Tagalog"
                  />
                  Tagalog
                </button>
              </div>
            )}
          </div>

          <NavLink to={"/admin/email"}>
            <button className="text-black">
              <EmailOutlinedIcon style={{ fontSize: "20px" }} />
            </button>
          </NavLink>

          <button className="text-black">
            <NotificationsNoneOutlinedIcon style={{ fontSize: "20px" }} />
          </button>

          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="text-black flex items-center gap-3"
            >
              <img
                // src={user.profile.url}
                alt="User Profile Pic"
                className="rounded-full w-12 h-12"
              />
              {/* <span>{user.fname + " " + user.lname}</span> */}
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

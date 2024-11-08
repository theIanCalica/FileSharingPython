import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../utils/Helpers";
import client from "../../../utils/client";
import PhoneIcon from "@mui/icons-material/Phone";
import Swal from "sweetalert2";
const Sidebar = ({ isMinimized }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState("dashboard");
  const [expanded, setExpanded] = useState({
    foods: false,
    users: false,
  });

  const handleItemClick = (item) => {
    setSelected(item);
  };

  const toggleExpansion = (item) => {
    setExpanded((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
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
    <aside
      className={`  text-white overflow-hidden  ${
        isMinimized ? "w-20" : "w-80"
      }`}
      style={{ backgroundColor: "white" }}
    >
      {!isMinimized && (
        <div className="p-4 text-xl font-bold font-serif flex flex-row justify-center items-center -ml-2">
          <img
            src="/images/logoTransparent.png"
            alt="Cinemax"
            className="w-12 mr-3"
          />
          Cinemax
        </div>
      )}

      {/* Image displayed when minimized */}
      {isMinimized && (
        <div className="p-4 flex justify-center items-center">
          <img
            src="/images/logoTransparent.png"
            alt="Cinemax"
            className="ml-6"
          />
        </div>
      )}
      <ul className="mt-5 text-xs">
        {/* Sidebar Items */}
        <Link to="/admin">
          <li
            className="mt-3 py-2 px-8 text-gray-400 cursor-pointer flex items-center w-full transition-colors duration-300 ease-in-out relative"
            onMouseOver={() => setHovered("dashboard")}
            onMouseOut={() => setHovered(null)}
            onClick={() => handleItemClick("dashboard")}
            style={{
              backgroundColor:
                hovered === "dashboard" || selected === "dashboard"
                  ? "#D9DDE8"
                  : "transparent",
            }}
          >
            {selected === "dashboard" && <></>}
            <div className="mr-5 rounded-md transition-colors duration-300 ease-in-out">
              <DashboardIcon
                style={{
                  color: "#605BFF",
                  fontSize: "1.7rem",
                  lineHeight: "1",
                }}
                className="p-1"
              />
            </div>
            <span
              className={`transition-all ease-in-out duration-500 ${
                isMinimized ? "hidden" : "block"
              }`}
              style={{
                fontSize: "16px",
                color:
                  hovered === "dashboard" || selected === "dashboard"
                    ? "#A1A1AC"
                    : "#605BFF",
              }}
            >
              Dashboard
            </span>
          </li>
        </Link>
        {/* <Link to="/admin/task">
          <li
            className="mt-3 py-2 px-8 text-gray-400 cursor-pointer flex items-center w-full transition-colors duration-300 ease-in-out relative"
            onMouseOver={() => setHovered("task")}
            onMouseOut={() => setHovered(null)}
            onClick={() => handleItemClick("task")}
            style={{
              backgroundColor:
                hovered === "task" || selected === "task"
                  ? "#D9DDE8"
                  : "transparent",
            }}
          >
            {selected === "task" && <></>}
            <div className="mr-5 rounded-md transition-colors duration-300 ease-in-out">
              <AssignmentIcon
                style={{
                  color: "#5A6AFF",
                  fontSize: "1.7rem",
                  lineHeight: "1",
                }}
                className="p-1"
              />
            </div>
            <span
              className={`transition-all ease-in-out duration-500 ${
                isMinimized ? "hidden" : "block"
              }`}
              style={{
                fontSize: "16px",
              }}
            >
              Task
            </span>
          </li>
        </Link> */}
        {/* Users */}
        <Link to="/admin/users">
          <li
            className="mt-3 py-2 px-8 text-gray-400 cursor-pointer flex items-center w-full transition-colors duration-300 ease-in-out relative"
            onMouseOver={() => setHovered("users")}
            onMouseOut={() => setHovered(null)}
            onClick={() => handleItemClick("users")}
            style={{
              backgroundColor:
                hovered === "users" || selected === "users"
                  ? "#D9DDE8"
                  : "transparent",
            }}
          >
            {selected === "users" && <></>}
            <div className="mr-5 rounded-md transition-colors duration-300 ease-in-out">
              <GroupIcon
                style={{
                  color: "#605BFF",
                  fontSize: "1.7rem",
                  lineHeight: "1",
                }}
                className="p-1"
              />
            </div>
            <span
              className={`text-gray-500 transition-all ease-in-out duration-500 ${
                isMinimized ? "hidden" : "block"
              }`}
              style={{
                fontSize: "16px",
              }}
            >
              Users
            </span>
          </li>
        </Link>

        <Link to="/admin/contacts">
          <li
            className="mt-3 py-2 px-8 text-gray-400 cursor-pointer flex items-center w-full transition-colors duration-300 ease-in-out relative"
            onMouseOver={() => setHovered("contacts")}
            onMouseOut={() => setHovered(null)}
            onClick={() => handleItemClick("contacts")}
            style={{
              backgroundColor:
                hovered === "contacts" || selected === "contacts"
                  ? "#D9DDE8"
                  : "transparent",
            }}
          >
            {selected === "contacts" && <></>}
            <div className="mr-5 rounded-md transition-colors duration-300 ease-in-out">
              <PhoneIcon
                style={{
                  color: "#605BFF",
                  fontSize: "1.7rem",
                  lineHeight: "1",
                }}
                className="p-1"
              />
            </div>
            <span
              className={`text-gray-500 transition-all ease-in-out duration-500 ${
                isMinimized ? "hidden" : "block"
              }`}
              style={{
                fontSize: "16px",
              }}
            >
              Contacts
            </span>
          </li>
        </Link>
        {/* <li
          className="mt-3 py-2 px-8 text-gray-400 cursor-pointer flex items-center w-full transition-colors duration-300 ease-in-out relative"
          onMouseOver={() => setHovered("foods")}
          onMouseOut={() => setHovered(null)}
          onClick={() => handleItemClick("foods")}
          style={{
            backgroundColor:
              hovered === "foods" || selected === "foods"
                ? "#FAFAFB"
                : "transparent",
          }}
        >
          {selected === "foods" && <></>}
          <div className="mr-5 rounded-md transition-colors duration-300 ease-in-out">
            <FastfoodIcon
              style={{ color: "#605BFF", fontSize: "1.7rem", lineHeight: "1" }}
              className="p-1"
            />
          </div>
          <span
            className={`transition-all ease-in-out duration-500 ${
              isMinimized ? "hidden" : "block"
            }`}
            style={{
              fontSize: "16px",
            }}
          >
            Foods
          </span>
          <div
            className={`ml-auto cursor-pointer ${
              isMinimized ? "hidden" : "block"
            }`}
            onClick={() => toggleExpansion("foods")}
          >
            {expanded.foods ? (
              <KeyboardArrowDownIcon style={{ color: "#5A6AFF" }} />
            ) : (
              <KeyboardArrowLeftIcon style={{ color: "#5A6AFF" }} />
            )}
          </div>
        </li>
        {expanded.foods && (
          <ul className="mt-2 text-gray-400 text-xs">
            <Link to="food/food-list">
              <li className="py-2 px-8 cursor-pointer hover:bg-slate-100 transition-colors duration-300 ease-in-out">
                <KeyboardArrowRightIcon className="mr-5 ml-2" />
                Food List
              </li>
            </Link>

            <Link to="food/category">
              <li className="py-2 px-8 cursor-pointer hover:bg-slate-100 transition-colors duration-300 ease-in-out">
                <KeyboardArrowRightIcon className="mr-5 ml-2" />
                Category
              </li>
            </Link>
          </ul>
        )} */}
        <h1
          className={`text-gray-400 font-sans px-8 pt-1 ${
            isMinimized ? "hidden" : "block"
          } `}
        >
          User
        </h1>
        {/* User Profile */}
        <Link to="profile">
          <li
            className="mt-3 py-2 px-8 text-gray-400 cursor-pointer flex items-center w-full transition-colors duration-300 ease-in-out relative"
            onMouseOver={() => setHovered("profile")}
            onMouseOut={() => setHovered(null)}
            onClick={() => handleItemClick("profile")}
            style={{
              backgroundColor:
                hovered === "profile" || selected === "profile"
                  ? "#D9DDE8"
                  : "transparent",
            }}
          >
            {/* {selected === "profile" && (
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-green-500" />
            )} */}
            <div className="mr-5 rounded-md transition-colors duration-300 ease-in-out">
              <PersonIcon
                style={{
                  color: "#605BFF",
                  fontSize: "1.7rem",
                  lineHeight: "1",
                }}
                className="p-1"
              />
            </div>
            <span
              className={` text-gray-500 transition-all ease-in-out duration-500  ${
                isMinimized ? "hidden" : "block"
              }`}
              style={{
                fontSize: "16px",
                color:
                  hovered === "profile" || selected === "profile"
                    ? "605BFF"
                    : "#9ca3af",
              }}
            >
              Profile
            </span>
          </li>
        </Link>

        {/* Logout */}
        <li
          className="mt-3 py-2 px-8 text-gray-400 cursor-pointer flex items-center w-full transition-colors duration-300 ease-in-out relative"
          onMouseOver={() => setHovered("logout")}
          onMouseOut={() => setHovered(null)}
          onClick={handleLogout}
          style={{
            backgroundColor:
              hovered === "logout" || selected === "logout"
                ? "#D9DDE8"
                : "transparent",
          }}
        >
          {selected === "logout" && <></>}
          <div className="mr-5 rounded-md transition-colors duration-300 ease-in-out">
            <LogoutIcon
              style={{
                color: "#5A6AFF",
                fontSize: "1.7rem",
                lineHeight: "1",
              }}
              className="p-1"
            />
          </div>
          <span
            className={`text-gray-500 transition-all ease-in-out duration-500 ${
              isMinimized ? "hidden" : "block"
            }`}
            style={{
              fontSize: "16px",
              color:
                hovered === "message" || selected === "message"
                  ? "605BFF"
                  : "#9ca3af",
            }}
          >
            Logout
          </span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

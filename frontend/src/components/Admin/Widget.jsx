import React from "react";
import { KeyboardArrowUp as KeyboardArrowUpIcon } from "@mui/icons-material";
import { PersonOutlineOutlined as PersonOutlineOutlinedIcon } from "@mui/icons-material";
import { ShoppingCartOutlined as ShoppingCartOutlinedIcon } from "@mui/icons-material";
import { MonetizationOnOutlined as MonetizationOnOutlinedIcon } from "@mui/icons-material";
import { ConfirmationNumberOutlined as ConfirmationNumberOutlinedIcon } from "@mui/icons-material";

const Widget = ({ type, count }) => {
  let data;
  const diff = 20;

  switch (type) {
    case "User":
      data = {
        title: "USERS",
        isMoney: false,
        count: count,
        link: "See all users",
        icon: (
          <PersonOutlineOutlinedIcon
            style={{
              width: "4rem",
              height: "4rem",
              color: "crimson",
              backgroundColor: "rgba(255,0,0,0.2)",
              padding: "0.5rem",
              borderRadius: "50%",
            }}
          />
        ),
      };
      break;
    case "Order":
      data = {
        title: "ORDERS",
        isMoney: false,
        count: count,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            style={{
              width: "4rem",
              height: "4rem",
              color: "goldenrod",
              backgroundColor: "rgba(218,165,32,0.2)",
              padding: "0.5rem",
              borderRadius: "50%",
            }}
          />
        ),
      };
      break;
    case "Booking":
      data = {
        title: "BOOKINGS",
        isMoney: false,
        count: count,
        link: "View all bookings",
        icon: (
          <ConfirmationNumberOutlinedIcon
            style={{
              width: "4rem",
              height: "4rem",
              color: "purple",
              backgroundColor: "rgba(128,0,128,0.2)",
              padding: "0.5rem",
              borderRadius: "50%",
            }}
          />
        ),
      };
      break;
    case "Earnings":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            style={{
              width: "4rem",
              height: "4rem",
              color: "green",
              backgroundColor: "rgba(0,128,0,0.2)",
              padding: "0.5rem",
              borderRadius: "50%",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="flex justify-between p-6 shadow-md rounded-lg w-96 h-40 bg-white">
      <div className="flex flex-col justify-between">
        <span className="font-bold text-lg text-gray-600">{data.title}</span>
        <span className="text-4xl font-medium">
          {data.isMoney && "₱"} {count}
        </span>
        <span className="text-sm border-b border-gray-400 w-max cursor-pointer">
          {data.link}
        </span>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div
          className={`flex items-center text-lg ${
            diff > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          <KeyboardArrowUpIcon className="text-3xl" />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;

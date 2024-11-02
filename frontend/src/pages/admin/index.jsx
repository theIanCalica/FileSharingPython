import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Widget from "../../components/Admin/Widget";
import BarChart from "../../components/Admin/Chart/BarChart";
import LineChart from "../../components/Admin/Chart/LineChart";
import PieChart from "../../components/Admin/Chart/PieChart";
import Map from "../../components/Admin/Map";
import { notifySuccess, notifyError } from "../../utils/Helpers";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import client from "../../utils/client";

const Home = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  const getNumberofUsers = async () => {
    try {
      const response = await client.get(
        `${process.env.REACT_APP_API_LINK}/user-count`
      );
      setUserCount(response.data.user_count);
    } catch (err) {
      console.error("Error fetching user count:", err);
    }
  };

  useEffect(() => {
    getNumberofUsers();
    // getNumberOfOrder();
    // getNumberOfBooking();

    // if (loggedIn && user && user.role === "admin") {
    //   notifySuccess("Successfully logged in");
    // }
  }, [loggedIn]);
  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">
        Welcome to the admin dashboard. Here you can manage all aspects of your
        application.
      </p>

      <div className="flex mt-5 justify-between items-center">
        <Widget type="User" count={userCount}></Widget>
        <Widget type="Order" count={orderCount}></Widget>
        <Widget type="Booking" count={orderCount}></Widget>
      </div>
      <div className="container mt-5 bg-white p-4 shadow-md rounded-lg ">
        <BarChart />

        <div className="flex justify-between items-center mt-4">
          <div className="text-blue-500 cursor-pointer hover:underline">
            View More
          </div>

          <button className="bg-transparent border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white transition-colors duration-300">
            Download Report
          </button>
        </div>
      </div>

      <div className="container mt-5 bg-white p-4 shadow-md rounded-lg">
        <Map />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;

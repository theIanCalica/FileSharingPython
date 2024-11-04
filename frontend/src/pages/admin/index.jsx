import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Widget from "../../components/Admin/Widget";
import BarChart from "../../components/Admin/Chart/BarChart";
import LineChart from "../../components/Admin/Chart/LineChart";
import PieChart from "../../components/Admin/Chart/PieChart";
import Map from "../../components/Admin/Map";
import { notifySuccess, notifyError, getUser } from "../../utils/Helpers";
import { ToastContainer } from "react-toastify";
import client from "../../utils/client";

const Home = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const user = getUser();
  const [userCount, setUserCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [deactivateCount, setDeactivateCount] = useState(0);

  const getNumberofUsers = async () => {
    try {
      const response = await client.get(
        `${process.env.REACT_APP_API_LINK}/user-count`,
        { withCredentials: true }
      );
      setUserCount(response.data.user_count);
    } catch (err) {
      console.error("Error fetching user count:", err);
    }
  };

  const getNumberOfContact = async () => {
    try {
      await client
        .get(`${process.env.REACT_APP_API_LINK}/contact-count/`, {
          withCredentials: true,
        })
        .then((response) => {
          setContactCount(response.data.contact_count);
        })
        .catch((err) => {
          notifyError("Error fetching number of contacts");
          console.error("Error fetching number of contacts:", err);
        });
    } catch (err) {
      notifyError("Error fetching number of contacts");
      console.error("Error fetching number of contacts:", err);
    }
  };

  const getNumberofDeactivated = async () => {
    try {
      await client
        .get(`${process.env.REACT_APP_API_LINK}/deactivated-count/`)
        .then((response) => {
          console.log(response.data);
          setDeactivateCount(response.data.deactivated_count);
        })
        .catch((error) => {
          notifyError("Error fetching number of contacts");
          console.error("Error fetching number of contacts:", error);
        });
    } catch (err) {
      notifyError("Error fetching number of contacts");
      console.error("Error fetching number of contacts:", err);
    }
  };

  useEffect(() => {
    getNumberofUsers();
    getNumberOfContact();
    getNumberofDeactivated();

    if (loggedIn && user && user.is_superuser === true) {
      notifySuccess("Successfully logged in");
    }
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
        <Widget type="Contact" count={contactCount}></Widget>
        <Widget type="Deactivated" count={deactivateCount}></Widget>
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

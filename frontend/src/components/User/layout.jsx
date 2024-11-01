// frontend/src/components/User/Auth/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar"; // Adjust this path if Navbar is in a different folder
import Footer from "../Footer/Footer"; // Adjust this based on your actual structure

const Layout = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />
      <main className="p-4 flex-grow" style={{ backgroundColor: "#F0F1F6" }}>
        <Outlet />
      </main>
      <Footer /> {/* Ensure this is correctly imported */}
    </div>
  );
};

export default Layout;

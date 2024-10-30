import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <main
          className="p-4 h-screen overflow-auto "
          style={{ backgroundColor: "#F0F1F6" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

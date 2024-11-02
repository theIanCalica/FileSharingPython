import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Fixed width */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Main content - Full width minus the Sidebar */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main
          className="p-4 h-full overflow-auto"
          style={{ backgroundColor: "#F0F1F6" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/user/index";

// Layouts and pages for admin
import AdminLayout from "./components/Admin/Layout";
import AdminHomePage from "./pages/admin/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>

        {/* Routes for admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

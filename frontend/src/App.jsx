import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/user/Auth/index";

// Pages for authenticated user
import index from "./pages/user/Auth/index";
import AuthUserLayout from "./components/User/Auth/Layout";
// Layouts and pages for admin
import AdminLayout from "./components/Admin/Layout";
import AdminHomePage from "./pages/admin/index";
import UsersPage from "./pages/admin/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/drive" element={<AuthUserLayout />}>
          <Route index element={<index />}></Route>
        </Route>
        {/* Routes for admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />}></Route>
          <Route path="users" element={<UsersPage />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

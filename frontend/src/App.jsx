import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/user/index";

// Layouts and pages for admin
import AdminLayout from "./components/Admin/Layout";
import AdminHomePage from "./pages/admin/index";
import UsersPage from "./pages/admin/Users";
import SignIn from "./pages/user/signin/signin";
import SignUp from './pages/user/signup/signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
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

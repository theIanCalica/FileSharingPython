import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/user/index";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>

        {/* Routes for admin */}
      </Routes>
    </Router>
  );
}

export default App;

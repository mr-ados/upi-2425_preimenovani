// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import StudentProfile from "./components/StudentProfile";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Dobrodošli u aplikaciju Menza</h1>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

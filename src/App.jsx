// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import StudentProfile from "./components/StudentProfile";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import Header from "./components/Header";
import './styles.css';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

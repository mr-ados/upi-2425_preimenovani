// src/App.jsx
import React from "react";
import { initializeApp } from "firebase/app";
import Login from "./components/Login";

console.log(initializeApp); // Provjera firebase modula

const App = () => {
  return (
    <div>
      <h1>Dobrodošli u moju aplikaciju</h1>
      <Login />
    </div>
  );
};

export default App;

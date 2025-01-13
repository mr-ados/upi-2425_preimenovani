import React, { useState } from "react";
import { auth } from "../firebaseConfig";  // Assuming you have a firebaseConfig.js file set up
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";  // Assuming you have the necessary CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("login"); // 'login', 'menu', 'details'

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Prijava uspješna");
      setView("menu");
    } catch (error) {
      console.error("Greška pri prijavi: ", error);
      alert("Prijava nije uspjela");
    }
  };

  const goToMenu = () => {
    setView("menu");
  };

  const goToDetails = () => {
    setView("details");
  };

  const goBackToMenu = () => {
    setView("menu");
  };

  return (
    <div>
      {view === "login" && (
        <div className="login-container" id="login">
          <h1>Login</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}

      {view === "menu" && (
        <div className="menu-container" id="menu">
          <div className="menu-list">
            <div className="menu-item">
              <h3>FESB</h3>
              <p>Status: <span className="open">Otvoreno</span></p>
              <p>Radno vrijeme: 8:00 - 20:00</p>
            </div>
            <div className="menu-item">
              <h3>FGAG</h3>
              <p>Status: <span className="closed">Zatvoreno</span></p>
              <p>Radno vrijeme: 10:00 - 18:00</p>
            </div>
            <div className="menu-item">
              <h3>Ekonomija</h3>
              <p>Status: <span className="open">Otvoreno</span></p>
              <p>Radno vrijeme: 7:00 - 22:00</p>
            </div>
          </div>
          <div className="balance-container">
            <h2>Stanje x-ice</h2>
            <p>Trenutno stanje: 120.00 HRK</p>
            <button onClick={goToDetails}>Detalji</button>
          </div>
        </div>
      )}

      {view === "details" && (
        <div className="details-container" id="details">
          <h2>Detalji Studenta</h2>
          <p>Ime: Ivan Horvat</p>
          <p>Broj x-ice: 12345678</p>
          <p>Potrošnja ovog mjeseca: 380.00 HRK</p>
          <p>Preostalo stanje: 120.00 HRK</p>
          <button onClick={goBackToMenu}>Natrag</button>
        </div>
      )}
    </div>
  );
};

export default Login;
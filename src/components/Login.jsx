// src/components/Login.js
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid;

      if (uid === "6wzWtXrjqjTghE6E704N5cOmpLF2") {
        navigate('/admin'); // Preusmjeravanje na admin stranicu
      } else {
        navigate('/student-dashboard'); // Preusmjeravanje na student dashboard stranicu
      }

      console.log("Prijava uspješna, UID:", uid);
      alert("Prijava uspješna");
    } catch (error) {
      console.error("Greška pri prijavi: ", error);
      alert("Prijava nije uspjela");
    }
  };

  return (
    <div>
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
  );
};

export default Login;

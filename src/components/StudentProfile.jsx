// src/components/StudentProfile.js
import React, { useState, useEffect } from "react";
import { database, auth } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom"; // Ažurirajte uvoz

const StudentProfile = () => {
  const [studentData, setStudentData] = useState({});
  const navigate = useNavigate(); // Koristite useNavigate

  useEffect(() => {
    const fetchStudentData = async () => {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const studentRef = ref(database, 'students/' + uid);
        onValue(studentRef, (snapshot) => {
          const data = snapshot.val();
          setStudentData(data);
        });
      } else {
        navigate('/login'); // Preusmjeri na login ako korisnik nije prijavljen
      }
    };

    fetchStudentData();
  }, [navigate]);

  return (
    <div>
      <h1>Student Profil</h1>
      {studentData ? (
        <>
          <p>UID: {studentData.UID}</p>
          <p>JMBAG: {studentData.jmbag}</p>
          <p>Stanje računa: {studentData.balance} kn</p>
        </>
      ) : (
        <p>Učitavanje podataka...</p>
      )}
    </div>
  );
};

export default StudentProfile;

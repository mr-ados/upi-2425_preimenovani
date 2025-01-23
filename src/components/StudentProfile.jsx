// src/components/StudentProfile.js
import React, { useState, useEffect } from "react";
import { database, auth } from "../firebaseConfig";
import { ref, onValue, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import './Login.css'; // Import the CSS file

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const studentRef = ref(database, "students/" + uid);

        onValue(studentRef, (snapshot) => {
          const data = snapshot.val();

          if (data && data.transactions) {
            const transactionKeys = Object.keys(data.transactions);

            // Ako ima više od 10 transakcija, briši najstarije
            if (transactionKeys.length > 10) {
              // Sortiraj ključeve po datumu transakcija (najstarije prve)
              transactionKeys.sort(
                (a, b) =>
                  new Date(data.transactions[a].date) -
                  new Date(data.transactions[b].date)
              );

              // Ključevi transakcija za brisanje (od najstarije do pre 10. najnovije)
              const keysToDelete = transactionKeys.slice(
                0,
                transactionKeys.length - 10
              );

              keysToDelete.forEach((key) => {
                const transactionRef = ref(
                  database,
                  `students/${uid}/transactions/${key}`
                );
                remove(transactionRef);
              });
            }
          }

          setStudentData(data);
        });
      } else {
        navigate("/login"); // Preusmjeravanje na login ako korisnik nije prijavljen
      }
    };

    fetchStudentData();
  }, [navigate]);

  return (
    <div className="container">
      <h1>Student Profil</h1>
      {studentData ? (
        <>
          <p>UID: {studentData.UID}</p>
          <p>JMBAG: {studentData.jmbag}</p>
          <p>Stanje računa: {studentData.balance} kn</p>
          <h2>Povijest transakcija</h2>
          <div className="transactionBox">
            <ul>
              {studentData.transactions &&
                Object.keys(studentData.transactions)
                  .reverse()
                  .map((txnId) => (
                    <li key={txnId}>
                      <p>Iznos: {studentData.transactions[txnId].amount} kn</p>
                      <p>Datum: {studentData.transactions[txnId].date}</p>
                      <p>Opis: {studentData.transactions[txnId].description}</p>
                    </li>
                  ))}
            </ul>
          </div>
          <button onClick={() => navigate("/student-dashboard")}>
            Back to Dashboard
          </button>
        </>
      ) : (
        <p>Učitavanje podataka...</p>
      )}
    </div>
  );
};

export default StudentProfile;

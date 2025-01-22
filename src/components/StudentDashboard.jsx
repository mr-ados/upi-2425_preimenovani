// src/components/StudentDashboard.js
import React, { useState, useEffect } from "react";
import { database, auth } from "../firebaseConfig";
import { ref, onValue, update } from "firebase/database";
import '../styles.css';

const StudentDashboard = () => {
  const [menzaData, setMenzaData] = useState({});
  const [studentData, setStudentData] = useState(null);
  const [menuItems, setMenuItems] = useState({});

  useEffect(() => {
    const menzaRef = ref(database, 'menza');
    onValue(menzaRef, (snapshot) => {
      const data = snapshot.val();
      setMenzaData(data);
    });

    const menuRef = ref(database, 'menu');
    onValue(menuRef, (snapshot) => {
      const data = snapshot.val();
      setMenuItems(data);
    });

    const fetchStudentData = async () => {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const studentRef = ref(database, 'students/' + uid);
        onValue(studentRef, (snapshot) => {
          const data = snapshot.val();
          setStudentData(data);
        });
      }
    };

    fetchStudentData();
  }, []);

  const handlePurchase = async (menzaKey) => {
    if (!studentData) {
      alert("Učitavanje podataka o studentu nije završeno.");
      return;
    }

    const selectedMenu = menzaData[menzaKey];
    const totalPrice = Object.keys(selectedMenu).reduce((total, category) => {
      const itemName = selectedMenu[category];
      const itemPrice = menuItems[category]?.[itemName]?.cijena || 0;
      return total + itemPrice;
    }, 0);

    if (studentData.balance < totalPrice) {
      alert("Nema dovoljno sredstava na računu.");
      return;
    }

    const updatedBalance = studentData.balance - totalPrice;
    const studentRef = ref(database, 'students/' + auth.currentUser.uid);

    try {
      await update(studentRef, { balance: updatedBalance });
      alert("Kupnja uspješna!");
    } catch (error) {
      console.error("Greška pri ažuriranju stanja računa: ", error);
      alert("Kupnja nije uspjela.");
    }
  };

  return (
    <div className="container">
      <h1>Student Dashboard</h1>
      <div>
        {Object.keys(menzaData).map((menzaKey) => (
          <div key={menzaKey}>
            <h2>{`Menza ${menzaKey}`}</h2>
            <ul>
              <li>{`Desert: ${menzaData[menzaKey].desert} - Cijena: ${menuItems.desert?.[menzaData[menzaKey].desert]?.cijena || 0} kn`}</li>
              <li>{`Glavno Jelo: ${menzaData[menzaKey].glavnoJelo} - Cijena: ${menuItems.glavnaJela?.[menzaData[menzaKey].glavnoJelo]?.cijena || 0} kn`}</li>
              <li>{`Piće: ${menzaData[menzaKey].pice} - Cijena: ${menuItems.pice?.[menzaData[menzaKey].pice]?.cijena || 0} kn`}</li>
              <li>{`Predjelo: ${menzaData[menzaKey].predjelo} - Cijena: ${menuItems.predjela?.[menzaData[menzaKey].predjelo]?.cijena || 0} kn`}</li>
            </ul>
            <button onClick={() => handlePurchase(menzaKey)}>Kupi meni</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;

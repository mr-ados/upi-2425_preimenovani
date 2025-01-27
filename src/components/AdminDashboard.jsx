import React, { useState, useEffect } from "react";
import { database } from "../firebaseConfig";
import { ref, onValue, update, remove, get, push } from "firebase/database";
import './Login.css'; // Import the CSS file

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState({});
  const [selectedMenu, setSelectedMenu] = useState({});
  const [selectedMenza, setSelectedMenza] = useState("");

  useEffect(() => {
    const menuRef = ref(database, 'menu');
    onValue(menuRef, (snapshot) => {
      const data = snapshot.val();
      setMenuItems(data);
    });
  }, []);

  const handleSelectChange = (event, type) => {
    setSelectedMenu((prev) => ({ ...prev, [type]: event.target.value }));
    console.log(`Selected ${type}:`, event.target.value);
  };

  const handleMenzaChange = (event) => {
    setSelectedMenza(event.target.value);
    console.log('Selected menza:', event.target.value);
  };

  const handleAddToMenza = async () => {
    console.log('Adding to menza:', selectedMenza, selectedMenu);
    try {
      const menzaRef = ref(database, `menza/${selectedMenza}`);
      await update(menzaRef, {
        desert: selectedMenu.desert || '',
        glavnoJelo: selectedMenu.glavnoJelo || '',
        pice: selectedMenu.pice || '',
        predjelo: selectedMenu.predjelo || ''
      });
      alert("Stavka uspješno dodana!");
    } catch (error) {
      console.error("Greška pri dodavanju stavke: ", error);
      alert("Dodavanje stavke nije uspjelo");
    }
  };

  const handleDeleteFromMenza = async () => {
    try {
      const menzaRef = ref(database, `menza/${selectedMenza}`);
      await remove(menzaRef);
      alert("Stavka uspješno obrisana!");
    } catch (error) {
      console.error("Greška pri brisanju stavke: ", error);
      alert("Brisanje stavke nije uspjelo");
    }
  };

  const handleResetStudentBalances = async () => {
    try {
      const studentsRef = ref(database, 'students');
      const snapshot = await get(studentsRef);
      const studentsData = snapshot.val();

      if (studentsData) {
        const updates = {};
        for (const studentId in studentsData) {
          const currentBalance = studentsData[studentId].balance;
          const difference = 200 - currentBalance;

          // Ažuriraj stanje računa
          updates[`/students/${studentId}/balance`] = 200;
          
          // Dodaj transakciju za svakog studenta
          const transactionsRef = ref(database, `students/${studentId}/transactions`);
          const newTransactionRef = push(transactionsRef);
          updates[`/students/${studentId}/transactions/${newTransactionRef.key}`] = {
            amount: difference,
            date: new Date().toISOString().split('T')[0], // Formatirano kao YYYY-MM-DD
            description: 'Resetiranje stanja računa'
          };
        }

        await update(ref(database), updates);
        alert("Stanja računa uspješno resetirana na 200!");
      } else {
        alert("Nema podataka o studentima.");
      }
    } catch (error) {
      console.error("Greška pri resetiranju stanja računa: ", error);
      alert("Resetiranje stanja računa nije uspjelo");
    }
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Dodaj stavku na jelovnik</h2>
        <select onChange={handleMenzaChange} value={selectedMenza}>
          <option value="">Odaberite menzu</option>
          <option value="m1">Menza 1</option>
          <option value="m2">Menza 2</option>
          <option value="m3">Menza 3</option>
        </select>

        <div>
          <h3>Desert</h3>
          <select onChange={(e) => handleSelectChange(e, "desert")} value={selectedMenu.desert || ""}>
            <option value="">Odaberite desert</option>
            {Object.keys(menuItems.desert || {}).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        <div>
          <h3>Glavna Jela</h3>
          <select aria-label="odaberite glavno jelo" onChange={(e) => handleSelectChange(e, "glavnoJelo")} value={selectedMenu.glavnoJelo || ""}>
            <option value="">Odaberite glavno jelo</option>
            {Object.keys(menuItems.glavnaJela || {}).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        <div>
          <h3>Piće</h3>
          <select aria-label="odaberite piće" onChange={(e) => handleSelectChange(e, "pice")} value={selectedMenu.pice || ""}>
            <option value="">Odaberite piće</option>
            {Object.keys(menuItems.pice || {}).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        <div>
          <h3>Predjelo</h3>
          <select aria-label="odaberite predjelo" onChange={(e) => handleSelectChange(e, "predjelo")} value={selectedMenu.predjelo || ""}>
            <option value="">Odaberite predjelo</option>
            {Object.keys(menuItems.predjela || {}).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        <div className="container">
          <h2>Admin Dashboard</h2>
          <button className="menu-button" onClick={handleAddToMenza}>Dodaj stavku</button>
          <button className="menu-button" onClick={handleDeleteFromMenza}>Obriši stavku</button>
          <button className="menu-button" onClick={handleResetStudentBalances}>Resetiraj stanje računa</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
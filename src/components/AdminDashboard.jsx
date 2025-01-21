// src/components/AdminDashboard.js
import React, { useState, useEffect } from "react";
import { database } from "../firebaseConfig";
import { ref, onValue, update, remove } from "firebase/database";

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedMenza, setSelectedMenza] = useState("");
  const [menuCategories, setMenuCategories] = useState({
    desert: [],
    glavnaJela: [],
    pice: [],
    predjela: []
  });

  useEffect(() => {
    const menuRef = ref(database, 'menu');
    onValue(menuRef, (snapshot) => {
      const data = snapshot.val();
      setMenuItems(data);
    });
  }, []);

  const handleSelectChange = (event, type) => {
    setSelectedMenu((prev) => ({ ...prev, [type]: event.target.value }));
  };

  const handleMenzaChange = (event) => {
    setSelectedMenza(event.target.value);
  };

  const handleAddToMenza = async () => {
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

  return (
    <div>
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
              <option key={key} value={menuItems.desert[key]}>{menuItems.desert[key]}</option>
            ))}
          </select>
        </div>

        <div>
          <h3>Glavna Jela</h3>
          <select onChange={(e) => handleSelectChange(e, "glavnoJelo")} value={selectedMenu.glavnoJelo || ""}>
            <option value="">Odaberite glavno jelo</option>
            {Object.keys(menuItems.glavnaJela || {}).map((key) => (
              <option key={key} value={menuItems.glavnaJela[key]}>{menuItems.glavnaJela[key]}</option>
            ))}
          </select>
        </div>

        <div>
          <h3>Piće</h3>
          <select onChange={(e) => handleSelectChange(e, "pice")} value={selectedMenu.pice || ""}>
            <option value="">Odaberite piće</option>
            {Object.keys(menuItems.pice || {}).map((key) => (
              <option key={key} value={menuItems.pice[key]}>{menuItems.pice[key]}</option>
            ))}
          </select>
        </div>

        <div>
          <h3>Predjelo</h3>
          <select onChange={(e) => handleSelectChange(e, "predjelo")} value={selectedMenu.predjelo || ""}>
            <option value="">Odaberite predjelo</option>
            {Object.keys(menuItems.predjela || {}).map((key) => (
              <option key={key} value={menuItems.predjela[key]}>{menuItems.predjela[key]}</option>
            ))}
          </select>
        </div>

        <button onClick={handleAddToMenza}>Dodaj stavku</button>
        <button onClick={handleDeleteFromMenza}>Obriši stavku</button>
      </div>
    </div>
  );
};

export default AdminDashboard;

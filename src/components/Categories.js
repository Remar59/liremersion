import React, { useState, useEffect } from "react";
import "../styles/categories.scss"; // Importez votre fichier de styles pour les catégories
import AudioPlayer from "./AudioPlayer";


function Categories(selectedTrack) {
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("http://localhost:5500/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="categories-grid-container">
      <h2>Toutes les catégories</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <img src={category.image} alt={category.name} />
            <label htmlFor="img">{category.name}</label>
            <AudioPlayer
          selectedTrack={selectedTrack} /*backgroundColor={backgroundColor}*/
        />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;

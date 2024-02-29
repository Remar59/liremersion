import React, { useState, useEffect } from "react";
import "../styles/_categories.scss";

import AudioPlayer from "./AudioPlayer";
import { Link } from "react-router-dom";


function Categories(setSelectedTrack) {
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
    <div className="bg">
      <div className="bodyCat">
        <Link to={"/"}>
          <img className="logoimg" src="../logo.png" alt="" />
        </Link>
        <div className="categories-grid-container">
          <h1>Toutes les catégories</h1>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link to={`/category/${category._id}`}>
                <div key={category.id} className="category-item">
                  <img src={category.image} alt={category.name} />
                  <label htmlFor="img">{category.name}</label>
                </div>
              </Link>
            ))}

            <AudioPlayer
              setSelectedTrack={setSelectedTrack}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;

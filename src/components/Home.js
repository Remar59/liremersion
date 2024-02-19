import React, { Fragment } from "react";
import "../styles/home.scss";
import categories from "../categories";
import sounds from "../sounds";
import AudioPlayer from "./AudioPlayer";
import { tracks } from "../data/tracks";

function Home() {
  const changeSounds = (id) => {
    
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="header">
          <p>Bonjour !</p>
          <div>
            <a href="/login">Se connecter</a>
            <a href="/signup">Créer un compte</a>
          </div>
        </div>
        <h2>Catégories</h2>
        <div className="category-scrolling">
          {categories.map((item) => (
            <div key={item.id}>
              <img src={item.image} alt={item.name} />
              <label htmlFor="img">{item.name}</label>
            </div>
          ))}
        </div>
        <h2>Populaires</h2>
        <div className="popular-scrolling">
          {sounds.map((item) => (
            <Fragment >
                <div className="popular">
              <img className="popularimg"
                src={item.image}
                alt={item.name}
                onClick={() => changeSounds(item.id)}
              />
              <label className="popular" key={item.id + "_label"} htmlFor="img">
                {item.name}
              </label>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <AudioPlayer tracks={tracks} />
    </div>
  );
}

export default Home;

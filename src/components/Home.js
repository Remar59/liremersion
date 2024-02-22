import React, { Fragment, useState, useEffect } from "react";
import "../styles/home.scss";
import AudioPlayer from "./AudioPlayer";
import { tracks } from "../data/tracks";

function Home() {
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [categories, setCategories] = useState([]);
    const [sounds, setSounds] = useState([]);
    const changeSounds = (id) => {

        const selectedSound = sounds.find((sound) => sound.id === id);
        const selectedTrackInfo = tracks.find((track) => track.id === selectedSound.id);
        setSelectedTrack(selectedTrackInfo);
    };

    //combine les appels API
    useEffect(() => {
        async function fetchData(url, setter) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setter(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData('http://localhost:5500/categories', setCategories);
        fetchData('http://localhost:5500/sounds', setSounds);
    }, []);


    return (
        <div className="home-container">
            <div className="home-content">
                <div className="header">
                    <p>Bonjour !</p>
                    <div className="userConnect">
                        <a className="connect" href="/login">Se connecter</a>
                        <a className="signup" href="/signup">Créer un compte</a>
                    </div>
                </div>
                <h2>Catégories</h2>
                <div className="category-scrolling">
            {categories.map((item) => (
                <Fragment >
                <div key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <label htmlFor="img">{item.name}</label>
                </div>
                </Fragment>
            ))}
        </div>
                <h2>Sons populaires</h2>
                <div className="popular-scrolling">
                    {sounds.map((item) => (
                        <Fragment >
                            <div className="popular">
                                <img className="popularimg"
                                    src={item.image}
                                    alt={item.name}
                                    onClick={() => changeSounds(item.id)}
                                />
                                <label key={item.id + "_label"} htmlFor="img">
                                    {item.name}
                                </label>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
            <AudioPlayer selectedTrack={selectedTrack} />
        </div>
    );
}

export default Home;

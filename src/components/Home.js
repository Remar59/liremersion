import React, { Fragment, useState, useEffect } from "react";
import "../styles/home.scss";
import AudioPlayer from "./AudioPlayer";
import { tracks } from "../data/tracks";
// import { FastAverageColor } from "fast-average-color";

function Home() {
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [categories, setCategories] = useState([]);
    const [sounds, setSounds] = useState([]);
    // const [backgroundColor, setBackgroundColor] = useState('transparent');

    // const extractDominantColor = (imageUrl) => {
    //     const image = new Image();
    //     image.crossOrigin = 'Anonymous';
    //     image.src = imageUrl;

    //     const fac = new FastAverageColor();

    //     image.onload = function () {
    //         fac.getColorAsync(image)
    //             .then(color => {
    //                 setBackgroundColor(color.hex);
    //             })
    //             .catch(e => {
    //                 console.error('Erreur lors de l\'extraction de la couleur dominante :', e);
    //             });
    //     };
    // };

    const changeSounds = (id) => {

        const selectedSound = sounds.find((sound) => sound.id === id);
        const selectedTrackInfo = tracks.find((track) => track.id === selectedSound.id);
        setSelectedTrack(selectedTrackInfo);
        // extractDominantColor(selectedSound.image);
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

    // useEffect(() => {
    //     sounds.forEach((sound) => {
    //         extractDominantColor(sound.image);
    //     });
    // }, [sounds]);


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
                            <a href={`/Category/${item.name}`} className="category">
                                <div key={item.id}>
                                    <img src={item.image} alt={item.name} />
                                    <label htmlFor="img">{item.name}</label>
                                </div>
                            </a>
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
            {<AudioPlayer selectedTrack={selectedTrack} /*backgroundColor={backgroundColor}*/ />}
        </div>
    );
}

export default Home;

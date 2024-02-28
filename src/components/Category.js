import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/category.scss";
import { tracks } from "../data/tracks";

function Category() {

    const [selectedTrack, setSelectedTrack] = useState(null);
    const { categoryId } = useParams();
    const [categoryName, setCategoryName] = useState({ soundId: [] });
    const [sounds, setSounds] = useState([]);
    
    const changeSounds = (id) => {
        const selectedSound = sounds.find((sound) => sound.id === id);
        const selectedTrackInfo = tracks.find(
          (track) => track.id === selectedSound.id
        );
        setSelectedTrack(selectedTrackInfo);
        // extractDominantColor(selectedSound.image);
      };

    const listSound = categoryName.soundId.map((item) => {
        return (
            <>
                <div className="item">
                    <img src={item.image} alt={item.name} onClick={() => changeSounds(item.id)} />
                    <label htmlFor="img">{item.name}</label>
                </div>
            </>
        )
    })

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5500/categories/${categoryId}`);
                const data = await response.json();
                console.log(data);
                setCategoryName(data);
            } catch (error) {
                console.error("Error fetching category details:", error);
            }
        };
        fetchCategoryDetails();
    }, [categoryId]);


    return (
        <div className="categoryPage">
            <Link to={"/"}>
                <img className="logoimg" src="../logo.png" alt="" />
            </Link>
            <div className="categoryContainer">
                <h1>Catégorie {categoryName.name}</h1>
                <div className="sounds-grid">{listSound}</div>
            </div>
        </div>
    );
}

export default Category;

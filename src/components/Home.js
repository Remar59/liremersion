import React from 'react';
import '../styles/home.scss';
import categories from '../categories';
import sounds from '../sounds';
import AudioPlayer from './AudioPlayer'; 

function Home(props) {
    return (
        <div className='home-container'>
            <div className='home-content'>
                <div className='header'>
                    <p>Bonjour !</p>
                    <div>
                        <a href="/login">Se connecter</a>
                        <a href="/signup">Créer un compte</a>
                    </div>
                </div>
                <h2>Nos catégories</h2>
                <div className='category-scrolling'>
                    {categories.map(item => (
                        <div key={item.id}> 
                            <img src={item.image} alt={item.name} />
                            <label htmlFor="img">{item.name}</label>
                        </div>
                    ))}
                </div>
                <h2>Populaires</h2>
                <div className='popular-scrolling'>
                    {sounds.map(item => (
                        <a key={item.id} href={`/tracks/${item.id}`}>
                            <img src={item.image} alt={item.name} />
                            <label key={item.id + "_label"} htmlFor="img">{item.name}</label>
                        </a>
                    ))}
                </div>
            </div>
            <AudioPlayer tracks={sounds} />
        </div>
    );
}

export default Home;

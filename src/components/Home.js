import React from 'react';
import '../styles/home.scss';
import categories from '../categories';
import sounds from '../sounds';

function Home() {
    return (
        <div className='home-container'>
            <div className='home-content'>
                <div className='header'>
                    <p>Bonjour !</p>
                    <div>
                        <a href="">Se connecter</a>
                        <a href="/signup">Créer un compte</a>
                    </div>
                </div>
                <h2>Nos catégories</h2>
                <div className='category-scrolling'>
                    {categories.map(item => (
                        <div>
                            <img src={item.image} alt={item.name} />
                            <label htmlFor="img">{item.name}</label>
                        </div>
                    ))}
                </div>
                <h2>Populaires</h2>
                <div className='popular-scrolling'>
                    {sounds.map(item => (
                        <a href="/cat">
                            <img src={item.image} alt={item.name} />
                            <label htmlFor="img">{item.name}</label>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
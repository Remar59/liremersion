import React from 'react';
import '../styles/home.scss';
import categories from '../categories';
import sounds from '../sounds';

function Home() {
    return (
        <div className='home-container'>
            <div className='home-content'>
                <p>Bonjour !</p>
                <h2>Nos catégories</h2>
                <div className='category-scrolling'>
                    {categories.map(item => (
                        <div>
                            <img src={item.image} alt={item.name} />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
                <h2>Populaires</h2>
                <div className='popular-scrolling'>
                    {sounds.map(item => (
                        <a href="/cat">
                            <img src={item.image} alt={item.name} />
                            <span>{item.name}</span>
                        </a>
                    ))}    
                </div>
            </div>
        </div>
    );
}

export default Home;
// src/pages/Home.js
import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <h2>Welcome to PiStable Protocol</h2>
            <p>Your decentralized finance solution for stablecoin management.</p>
            <p>Explore our features:</p>
            <ul>
                <li>Governance: Participate in decision-making.</li>
                <li>Staking: Earn rewards by staking your tokens.</li>
                <li>Liquidity: Provide liquidity to earn fees.</li>
            </ul>
        </div>
    );
};

export default Home;

// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="app-header">
            <h1>PiStable Protocol</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/governance">Governance</Link>
                <Link to="/staking">Staking</Link>
                <Link to="/liquidity">Liquidity</Link>
            </nav>
        </header>
    );
};

export default Header;

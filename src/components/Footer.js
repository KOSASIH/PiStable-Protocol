// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="app-footer">
            <p>&copy; {new Date().getFullYear()} PiStable Protocol. All rights reserved.</p>
        </footer>
    );
};

export default Footer;

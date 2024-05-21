// src/components/Footer.js
import React from 'react';

function Footer() {
    console.log('Footer component rendered');
    return (
        <footer style={{ backgroundColor: '#39845f', padding: '1rem', color: 'white', textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' }}>
            <p>© 2024 Freelance pro - сервис по поиску фрилансеров. Made by Kvashnin Yuriy RTU "MIREA"</p>
        </footer>
    );
}

export default Footer;

import React from 'react';
import './Header.css';

function Header({ name = "" }) {
    return (
        <div className='header'>
            <h2>Characters {name.length ? `> ${name}` : ""}</h2>
        </div>
    );
}

export default Header;

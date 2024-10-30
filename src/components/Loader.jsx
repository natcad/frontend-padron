import React from 'react';
import './Loader.css'; // Create a CSS file for styling

const Loader = () => {
    return (
        <div className="loader">
            <div className="spinner"></div>
            <p>Cargando...</p>
        </div>
    );
};

export default Loader;

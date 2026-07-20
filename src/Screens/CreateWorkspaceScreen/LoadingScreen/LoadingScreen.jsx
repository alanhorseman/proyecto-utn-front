import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen-container">
      <div className="loading-box">
        <p className="loading-text">Creando tu espacio de trabajo...</p>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
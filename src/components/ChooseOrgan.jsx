// MainPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './ChooseOrgan.css'; // Import the stylesheet (create this file)
import Upload from './Upload';

const ChooseOrgan = () => {
  return (
    <div className="main-container">
      <h1>Medical Image Prediction</h1>
      <p>Select an organ to Segment:</p>

      <div className="button-container">
        <Link to="/Upload" className="prediction-button">
          Lungs
        </Link>
        <Link to="/upload/heart" className="prediction-button">
          Heart
        </Link>
        <Link to="/upload/brain" className="prediction-button">
          Brain
        </Link>
      </div>
    </div>
  );
};

export default ChooseOrgan;

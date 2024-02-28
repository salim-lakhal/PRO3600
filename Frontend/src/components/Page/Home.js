import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className="botStyle">
      {/* Speech Bubble */}
      {/*<div className="bubbleStyle">
        Voici notre projet, on le mettra au fur et à mesure à jour pour ajouter des features.
      </div>*/}
      
      {/* KryptoBot Logo */}
      <img className="logoStyle" src={"logopote.png"} alt="KryptoBot" />
    </div>
  );
};

export default Home;
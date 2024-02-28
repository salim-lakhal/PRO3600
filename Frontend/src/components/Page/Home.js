import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className="botStyle">
      {/* Speech Bubble */}
      {/*<div className="bubbleStyle">
        Voici notre sytème de stockage decentralisé, vous pouvez deposer et retirer vos fichier en toute sécurité.
      </div>*/}
      
      {/* KryptoBot Logo */}
      <img className="logoStyle" src={"logopote.png"} alt="KryptoBot" />
    </div>
  );
};

export default Home;
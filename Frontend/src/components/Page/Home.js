import React from 'react';
import './home.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Home = () => {
  return (
    <div>
      < Header /> 
    <div className="botStyle">
      
      {/* Speech Bubble */}
      {/*<div className="bubbleStyle">
        Voici notre sytème de stockage decentralisé, vous pouvez deposer et retirer vos fichier en toute sécurité.
      </div>*/}
      
      {/* KryptoBot Logo */}
      <img className="logoStyle" src={"logopote.png"} alt="KryptoBot" />
      < Footer /> 

    </div>
    </div>
  );
};

export default Home;
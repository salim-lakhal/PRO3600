import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './mesfichiers.css' ;
import Footer from '../Footer/Footer';
import Header from '../Header/Header';



const Mesfichiers = () => {

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

export default Mesfichiers;
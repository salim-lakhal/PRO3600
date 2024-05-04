import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './mesfichiers.css' ;
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const tab1 = ["fichier 1" , "fichier2" ];

const Mesfichiers = () => {

  return (
    <div>
      < Header /> 
    <div className="botStyle">
      
    {/* Tableau des fichiers */}
    <table className="fileTable">
          <thead>
            <tr>
              <th>Nom du fichier</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {tab1.length === 0 ? (
              <tr>
                <td colSpan="3">Pas de fichier</td>
              </tr>
            ) : (
              tab1.map((file, index) => (
                <tr key={index}>
                  <td>{file}</td>
                  <td>{/* Vous devez définir la date si elle est disponible */}</td>
                  <td><button>Télécharger</button></td>
                </tr>
              ))
            )}
          </tbody>

  </table>

  {/* Logo */}
  <img className="logoStyle" src={"logopote.png"} alt="KryptoBot" />

      < Footer /> 

    </div>
    </div>
  );
};

export default Mesfichiers;
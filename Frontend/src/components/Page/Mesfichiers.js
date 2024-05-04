import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import './mesfichiers.css' ;
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import getTokens from './Mint/demintnft';

const tab1 = [];

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
                  <td>  
                  <Button auto flat color="error" onClick={() => {
                  window.open('https://cdn.mos.cms.futurecdn.net/TdaG9Gex57AHnRZG79wYKT.jpg', '_blank');
                }} className="telecharger">
                Télécharger
              </Button>  
                  </td>
                </tr>
              ))
            )}
          </tbody>

  </table>

      < Footer /> 

    </div>
    </div>
  );
};

export default Mesfichiers;
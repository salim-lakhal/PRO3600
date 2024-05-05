import React from 'react';
import { Button } from '@nextui-org/react';
import './mesfichiers.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { getTokens } from './Mint/demintnft';



// Pour l'exemple, j'utiliserai des noms de fichiers statiques
const files = [{ name: 'fichier1.txt', date: '2024-05-01' },/*getTokens(); */
  { name: 'fichier2.jpg', date: '2024-05-02' },
  { name: 'fichier3.pdf', date: '2024-05-03' } ]

 /* Format du tableau ,*/

const MesFichiers = () => {
  return (
    <div>
      <Header />
      <div className="fileTableContainer">
        <table className="fileTable">
          <thead>
            <tr>
              <th>Nom du fichier</th>
              <th>Date</th>
              <th>Télécharger</th>
            </tr>
          </thead>
          <tbody>
            {files.length === 0 ? (
              <tr>
                <td colSpan="3">Pas de fichier</td>
              </tr>
            ) : (
              files.map((file, index) => (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>{file.date}</td>
                  <td>
                    <Button
                      auto
                      flat
                      color="error"
                      onClick={() => {
                        // Ici, j'utilise une image aléatoire comme lien de téléchargement pour l'exemple
                        window.open('https://cdn.mos.cms.futurecdn.net/TdaG9Gex57AHnRZG79wYKT.jpg', '_blank');
                      }}
                      className="downloadButton"
                    >
                      Télécharger
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default MesFichiers;
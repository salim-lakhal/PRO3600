import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import './mesfichiers.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { getTokens } from './Mint/demintnft';
import { burnToken } from './Mint/burnnft'; // Importez la fonction burnToken

const MesFichiers = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function fetchFiles() {
      const { nftArray } = await getTokens();
      setFiles(nftArray);
    }

    // Appel initial pour charger les fichiers
    fetchFiles();

    // Mettre à jour les fichiers toutes les 1 secondes
    const intervalId = setInterval(fetchFiles, 1000);

    // Nettoyage de l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, []);

  const handleDelete = async (nftId) => {
    try {
      await burnToken(nftId, "sEdTJwTTNmCH23Su1zwBHFYJT9Khswa", 'wss://s.altnet.rippletest.net:51233/'); // Appeler burnToken avec l'ID de la NFT
      setFiles((prevFiles) => prevFiles.filter(file => file.id !== nftId)); // Supprimez le fichier de l'état local
    } catch (error) {
      console.error('Error burning token:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="fileTableContainer">
        <table className="fileTable">
          <thead>
            <tr>
              <th>Nom du fichier</th>
              <th>Visualiser</th>
              <th>Supprimer</th>
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
                  <td>
                    <Button
                      auto
                      flat
                      color="error"
                      onClick={() => {
                        window.open(file.link, '_blank');
                      }}
                      className="downloadButton"
                    >
                      Visualiser
                    </Button>
                  </td>
                  <td>
                    <Button
                      auto
                      flat
                      color="error"
                      onClick={() => handleDelete(parseInt(file.name.match(/\d+$/)[0]))} // Appeler handleDelete avec l'ID du NFT
                      className="deleteButton"
                    >
                      Supprimer
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

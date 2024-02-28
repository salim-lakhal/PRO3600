import React, { useState, createContext } from 'react';
import Web3 from 'web3';

// Création du contexte pour le portefeuille
export const WalletContext = createContext(null);

// Composant fournisseur pour le WalletContext
export const WalletProvider = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');


  const [isAdmin, setIsAdmin] = useState(false);
  // Fonction pour connecter le portefeuille
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setWalletConnected(true);
          setWalletAddress(accounts[0]);

          /*const isAdminWallet = adminsList.includes(accounts[0]);*/




        }
      } catch (error) {
        console.error("Erreur lors de la connexion au portefeuille : ", error);
      }
    } else {
      console.error("MetaMask n'est pas installé.");
    }
  };

  // Fonction pour déconnecter le portefeuille
  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress('');
    setIsAdmin(false) ;
  };

  return (
    <WalletContext.Provider value={{ walletConnected, walletAddress, connectWallet, disconnectWallet, isAdmin }}>
      {children}
    </WalletContext.Provider>
  );
};

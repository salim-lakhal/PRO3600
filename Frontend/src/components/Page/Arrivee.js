import React, { useContext } from 'react';
import { Button } from '@nextui-org/react';
import { WalletContext } from '../../WalletProvider';
import Footer from '../Footer/Footer';
import './arrivee.css';

const Arrivee = () => {
  const { walletConnected, walletAddress, connectWallet } = useContext(WalletContext);
  

  return (
    <div className="arrivee-container">
          <div className="arrivee-container2">
      <div style={{ float: 'left', margin: '10px' }}>
            <h1 className="text">Bienvenue</h1>
      </div>
      {!walletConnected && (
        <Button auto flat color="success" onClick={connectWallet} className="connect-btn">
        Connect Wallet
      </Button>
      )}
      
      </div>
  
      <div style={{ float: 'right', margin: '50px' }}>
            <img src="logo.png" className="logo" alt="Logo" />
            </div>
      
      < Footer />
      {walletConnected && (
        <a href="/home">
        <button className="custom-button1">Go to home</button>
      </a>
      )}
    </div>
  );
};

export default Arrivee;


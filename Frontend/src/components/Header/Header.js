import React, { useContext } from 'react';
import { Button } from '@nextui-org/react';
import { WalletContext } from '../../WalletProvider';
import './Header.css'; // Importation du fichier CSS pour le style du header

const Header = () => {
  const { walletConnected, walletAddress, connectWallet, disconnectWallet } = useContext(WalletContext);

  const truncateAddress = (address) => address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : '';


  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header-left">
          <img src="logo.png" alt="logo" className="log" />
          <h1 className="title">Driv'INT</h1>
          <a href="/home" className="nav-link">Home</a>        
          <a href="/depot" className="nav-link">Dépôt de fichier</a>
          <a href="/mesfichiers" className="nav-link">Mes fichiers</a>
        </div>
        <div className="header-right">
              <div className="wallet-info">
                {truncateAddress(walletAddress)}
              </div>
              <Button auto flat color="error" onClick={() => {
                  disconnectWallet();
                }} className="disconnect-btn">
                Disconnect Wallet
              </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;


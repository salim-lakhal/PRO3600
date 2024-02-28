import React, { useContext } from 'react';
import { Button } from '@nextui-org/react';
import { WalletContext } from '../../WalletProvider';
import { Link } from 'react-router-dom';
import './Header.css'; // Importation du fichier CSS pour le style du header

const Header = () => {
  const { walletConnected, walletAddress, connectWallet, disconnectWallet } = useContext(WalletContext);

  const truncateAddress = (address) => address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : '';

  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header-left">
          <img src="logo.png" alt="logo" className="logo" />
          <h1 className="title">Stockage Décentralisé</h1>
          <Link to="/" className="nav-link">Home</Link>        
          <Link to="/components/Page/Depot" className="nav-link">Dépôt de fichier</Link>
          <Link to="/components/Page/Dossier" className="nav-link">Créer un nouveau dossier</Link>
        </div>
        <div className="header-right">
          {walletConnected ? (
            <>
              <div className="wallet-info">
                {truncateAddress(walletAddress)}
              </div>
              <Button auto flat color="error" onClick={disconnectWallet} className="disconnect-btn">
                Disconnect Wallet
              </Button>
            </>
          ) : (
            <Button auto flat color="success" onClick={connectWallet} className="connect-btn">
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

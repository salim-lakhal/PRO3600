import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { WalletProvider } from './WalletProvider';
import Home from './components/Page/Home';
import Depot from './components/Page/Depot';
import Dossier from './components/Page/Dossier';

function App() {
  return (
    <NextUIProvider>
      <WalletProvider>
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/components/Page/Depot" element={<Depot />} />
            <Route path="/components/Page/Dossier" element={<Dossier />} />
          </Routes>
          <Footer />
        </>
      </WalletProvider>
    </NextUIProvider>
  );
}

export default App;

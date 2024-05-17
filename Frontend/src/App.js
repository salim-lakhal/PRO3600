import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { WalletProvider } from './WalletProvider';
import Arrivee from './components/Page/Arrivee'; 
import Home from './components/Page/Home';
import Depot from './components/Page/Depot';
import Mesfichiers from './components/Page/Mesfichiers';

function App() {
  return (
      <WalletProvider>
          <Routes>
            <Route path="/" element={<Arrivee />} /> 
            <Route path="/home" element={<Home />} />
            <Route path="/depot" element={<Depot />} />
            <Route path="/mesfichiers" element={<Mesfichiers />} /> 
          </Routes>
      </WalletProvider>
  );
}

export default App;


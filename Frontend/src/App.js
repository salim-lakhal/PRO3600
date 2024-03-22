import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WalletProvider } from './WalletProvider';
import Arrivee from './components/Page/Arrivee'; 
import Home from './components/Page/Home';
import Depot from './components/Page/Depot';
import Dossier from './components/Page/Dossier';

function App() {
  return (
      <WalletProvider>
          <Routes>
            <Route path="/" element={<Arrivee />} /> 
            <Route path="/home" element={<Home />} />
            <Route path="/depot" element={<Depot />} />
            <Route path="/dossier" element={<Dossier />} /> 
          </Routes>
      </WalletProvider>
  );
}

export default App;


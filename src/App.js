import './App.css';
import MainPage from './components/MainPage';
import Header from './components/Header';
import EasterEgg from './components/EasterEgg';
import AboutProjContent from './components/AboutProjContent';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/AboutProjContent" element={<AboutProjContent />} />
          <Route path="/EasterEgg" element={<EasterEgg/>} />
        </Routes>
      </div>
    </Router>
);

}

export default App;

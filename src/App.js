import './App.css';
import MainPage from './components/MainPage';
import Header from './components/Header';
import EasterEgg from './components/EasterEgg';
import AboutProjContent from './components/AboutProjContent';
import Footer from './components/Footer';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';



function App() {


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <MainPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/AboutProjContent"
            element={
              <>
                <Header />
                <AboutProjContent />
                <Footer />
              </>
            }
          />
          <Route
            path="/EasterEgg"
            element={
              <>
                <Header />
                <EasterEgg />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
);

}

export default App;

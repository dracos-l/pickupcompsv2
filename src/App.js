import './App.css';
import MainPage from './components/MainPage';
import Header from './components/Header';
import EasterEgg from './components/EasterEgg';
import AboutProjContent from './components/AboutProjContent';
import Intro from './components/Intro';
import Footer from './components/Footer';
import Results from './components/Results';
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
                <Intro />
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
          <Route
            path="/Results"
            element={
              <>
                <Header />
                <Results />
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

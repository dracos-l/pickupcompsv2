import './App.css';
import MainPage from './components/MainPage';
import Header from './components/Header';
import EasterEgg from './components/EasterEgg';
import AboutProjContent from './components/AboutProjContent';
import Intro from './components/Intro';
import Footer from './components/Footer';
import Results from './components/Results'
import React from 'react';
import Edit from './components/Edit';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <div className="content">
                    <Intro />
                  </div>
                  <Footer />
                </>
              }
            />

            <Route path="/Form/:questionTitle" element={<> <Header /> <MainPage /> <Footer /> </>} />

            <Route
              path="/AboutProjContent"
              element={
                <>
                  <Header />
                  <div className="content">
                    <AboutProjContent />
                  </div>
                  <Footer />
                </>
              }
            />
            <Route
              path="/EasterEgg"
              element={
                <>
                  <Header />
                  <div className="content">
                    <EasterEgg />
                  </div>
                  <Footer />
                </>
              }
            />
            <Route
              path="/Results"
              element={
                <>
                  <Header />
                  <div className="content">
                    <Results />
                  </div>
                  <Footer />
                </>
              }
            />
            <Route
              path="/Edit"
              element={
                <>
                  <Header />
                  <div className="content">
                    <Edit />
                  </div>
                  <Footer />
                </>
              }
            />
            <Route
              path="/Login"
              element={
                <>
                  <Header />
                  <div className="content">
                    <Login />
                  </div>
                  <Footer />
                </>
              }
            />
            <Route
              path="/Signup"
              element={
                <>
                  <Header />
                  <div className="content">
                    <Signup />
                  </div>
                  <Footer />
                </>
              }
            />
            <Route
              path="/Profile"
              element={
                <>
                  <Header />
                  <div className="content">
                    <Profile />
                  </div>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

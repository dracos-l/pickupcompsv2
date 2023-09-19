import './App.css';
import MainPage from './components/MainPage';
import Header from './components/Header';
import React from 'react';
import AboutUs from './components/AboutUs';
import './App.scss';

function App() {
  return (
      <div className="App">
        <Header />
        <MainPage /> {/* Render the MainPage component */}
      </div>
);

}

export default App;

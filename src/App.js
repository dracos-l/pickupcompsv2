import './App.css';
import MainPage from './components/MainPage';
import Header from './components/Header';
import React from 'react';

function App() {
  return (
  <div className="App">
    <Header />
    <MainPage /> {/* Render the MainPage component */}
  </div>
);

}

export default App;

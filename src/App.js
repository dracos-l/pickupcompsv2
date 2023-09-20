import './App.css';
import MainPage from './components/MainPage';
import Header from './components/Header';
import React from 'react';
import { ThemeProvider } from 'react-bootstrap';

function App() {
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
  minBreakpoint="xxs"
    >  
    <div className="App">
      <Header />
      <MainPage /> {/* Render the MainPage component */}
    </div>
  </ThemeProvider>
);

}

export default App;

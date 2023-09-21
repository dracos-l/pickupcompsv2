import React from 'react';
import DropdownMenu from './DropdownMenu';


const Header = () => {
  return (
    <header>
      <h1>Website Name</h1>
      <img
        src="https://lanasports.com/wp-content/uploads/2020/10/unnamed.png"
        alt="aba_ball"
        class = "aba"
      />
      <nav>
        <DropdownMenu />
      </nav>
    </header>
  );
}

export default Header;

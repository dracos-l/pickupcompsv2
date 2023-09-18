import React from 'react';
import DropdownMenu from './DropdownMenu';

const Header = () => {
  return (
    <header>
      <nav>
        <div className="logo">Your Logo</div>
        <div className="menu">
            <DropdownMenu />
        </div>
      </nav>
    </header>
  );
}

export default Header;

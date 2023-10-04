import React from 'react';
import DropdownMenu from './DropdownMenu';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header>
      <div class = "extendedHeader"></div>
        <Link to = "/EasterEgg">
          <img
            src="https://lanasports.com/wp-content/uploads/2020/10/unnamed.png"
            alt="aba_ball"
            class = "aba"
          />
        </Link>
        <Link to = "/" style={{textDecoration:'none'}}>
          <img
            src="https://lanasports.com/wp-content/uploads/2020/10/unnamed.png"
            alt="logo"
            class="logo"
          />
        </Link>
      <nav>
        <Link to="/AboutProjContent" style={{textDecoration:'none'}}>
          <div class="AboutProjButton">About Project</div>
        </Link>
        <div class="DropdownMenuComp">
          <DropdownMenu />
        </div>
      </nav>
    </header>
  );
}

export default Header;

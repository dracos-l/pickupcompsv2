import React from 'react';
import DropdownMenu from './DropdownMenu';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header>
      <div class = "extendedHeader"></div>
        <div class="titleContainer">
          <Link to = "/" style={{textDecoration:'none'}}>
            <h1>Pickup Comps</h1>
          </Link>
        </div>
      <Link to = "/EasterEgg">
          <img
            src="https://lanasports.com/wp-content/uploads/2020/10/unnamed.png"
            alt="aba_ball"
            class = "aba"
          />
      </Link>
      <nav>
        <div class="DropdownMenuComp">
          <DropdownMenu />
        </div>
        <Link to="/AboutProjContent">
          <div class="AboutProjButton">About Project</div>
        </Link>
      </nav>
    </header>
  );
}

export default Header;

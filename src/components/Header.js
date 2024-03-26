import React from 'react';
import DropdownMenu from './DropdownMenu';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div>
      <header>
          <Link to = "/EasterEgg">
            <img
              src="https://lanasports.com/cdn/shop/files/Mikan-e1699463351760.png?v=1707862510&width=655"
              alt="aba_ball"
              class = "aba"
            />
          </Link>
          <Link to = "/" style={{textDecoration:'none'}}>
            <img
              src="https://lanasports.com/cdn/shop/files/Mikan-e1699463351760.png?v=1707862510&width=655"
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
    </div>
  );
}

export default Header;

import React from 'react';
import DropdownMenu from './DropdownMenu';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div>
      <header>
        <Link to="/EasterEgg">
          <img
            src={require(`./images/logo.png`)}
            alt="aba_ball"
            className="aba"
          />
        </Link>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img
            src={require(`./images/nametag.png`)}
            alt="logo"
            className="logo"
          />
        </Link>
        <nav>
          <Link to="/AboutProjContent" style={{ textDecoration: 'none' }}>
            <div className="AboutProjButton">About Project</div>
          </Link>
          <div className="DropdownMenuComp">
            <DropdownMenu />
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;

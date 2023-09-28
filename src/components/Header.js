import React from 'react';
import DropdownMenu from './DropdownMenu';
import {Link} from 'react-router-dom';


const Header = () => {
  return (

    <header>
      <Link to = "./">
      <h1>Pickup Comps</h1>
      </Link>
      <Link to = "./EasterEgg.js">
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
        <Link to="./AboutProjContent.js">
          <div class="AboutProjButton">About Project</div>
        </Link>
      </nav>
    </header>
  );
}

export default Header;

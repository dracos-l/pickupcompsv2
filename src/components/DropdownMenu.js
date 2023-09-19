import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';

function DropdownMenu() {
  return (
    <Dropdown>

      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="./AboutUs.js">About Us</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Project Description</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Contact Us</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownMenu;
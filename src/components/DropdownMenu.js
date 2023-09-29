import React, { useState, useEffect } from 'react';
import AboutUsContent from './AboutUsContent';
import ContactContent from './ContactContent';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openClick, setOpenClick] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setIsOpen(false);
    setSelectedItem(item);
    setIsPopupOpen(true); // Open the popup when an item is selected
    setOpenClick(true); // Set openClick to true to indicate a click event
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setOpenClick(false); // Reset openClick when the popup is closed
  };

  const closePopupCustom = () => {
    if (!openClick) {
      closePopup();
    }
    setOpenClick(false); // Reset openClick when the custom close function is called
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const popup = document.getElementById('popup');
      if (popup && !popup.contains(event.target)) {
        closePopupCustom(); // Click occurred outside the popup, close it with a delay
      }
    };

    if (isPopupOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isPopupOpen]);

  return (
    <div>
      <div className="dropdown" onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}>
        <button className="dropdown-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
          </svg>
        </button>
        {isOpen && (
          <ul className="dropdown-menu">
            <li onClick={() => handleItemClick('AboutUs')}>About Us</li>
            <li onClick={() => handleItemClick('Contact')}>Contact Us</li>
          </ul>
        )}
      </div>
      {isPopupOpen && (
        <div className="popup" id="popup">
          <div className="popup-content">
            <h3>
              {selectedItem === 'AboutUs' && (
                <div>
                  About Us
                </div>
              )}
              {selectedItem === 'Contact' && (
                <div>
                  Contact Us
                </div>
              )}
            </h3>
            {/* Add your content here */}
            {/* You can place your content inside a div with a max-height and overflow-y for scrolling */}
            <div className="scrollable-content">
              {selectedItem === 'AboutUs' && (
                <div className="aboutUs">
                  <AboutUsContent />
                </div>
              )}
              {selectedItem === 'Contact' && (
                <div className="contact">
                  <ContactContent />
                </div>
              )}
            </div>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;

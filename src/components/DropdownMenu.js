import React, { useState } from 'react';
import AboutUsContent from './AboutUsContent';
import ContactContent from './ContactContent';

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        setIsOpen(false);
        setSelectedItem(item);
        setIsPopupOpen(true); // Open the popup when an item is selected
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };


    return (
        <div>
            <div class="dropdown">
            <button class="dropdown-button" onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
            </button>
            {isOpen && (
                <ul class="dropdown-menu">
                    <li onClick={() => handleItemClick('AboutUs')}>About Us</li>
                    <li onClick={() => handleItemClick('Contact')}>Contact Us</li>
                </ul>
            )}
            </div>
            {isPopupOpen && (
                <div class="popup">
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
                                <div class="aboutUs">
                                    <AboutUsContent />
                                </div>
                            )}

                            {selectedItem === 'Contact' && (
                                <div class="contact">
                                    <ContactContent />
                                </div>
                            )}
                            </div>

                            <button onClick={closePopup}>Close</button>
                        </div>
                </div>
            )}
        </div>
    );}

export default DropdownMenu;
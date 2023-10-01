import React, { useState } from 'react';
import AboutUsContent from './AboutUsContent';
import ContactContent from './ContactContent';
import Modal from 'react-modal';

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null)


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        setIsOpen(false);
        setSelectedItem(item);
    };
    
    const closeModal = () => {
        setSelectedItem(null);
      };

    return (
        <div>
            <div class="dropdown" onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}>
            <button class="dropdown-button"  >
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
                <Modal
                isOpen={!!selectedItem}
                onRequestClose={closeModal}
                contentLabel="Popup Modal"
                className="popup-modal"
                shouldCloseOnOverlayClick={true}
                >
                    <div class="popup-content">
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

                        <button onClick={closeModal}>Close</button>
                        
                    </div>
            </Modal>
        </div>
    );}

export default DropdownMenu;
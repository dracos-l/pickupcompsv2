import React, { useState } from 'react';
import AboutUsContent from './AboutUsContent';
import ContactContent from './ContactContent';
import Modal from 'react-modal';

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null)
    const [isScrollDisabled, setScrollDisabled] = useState(false)


    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setScrollDisabled(!isScrollDisabled);
    };

    const handleItemClick = (item) => {
        setIsOpen(false);
        setSelectedItem(item);
        setScrollDisabled(!isScrollDisabled);
    };
    
    const closeModal = () => {
        setSelectedItem(null);
      };

    const bodyStyle = {
    overflow: isScrollDisabled ? 'hidden' : 'auto', // 'auto' to re-enable scrolling
    };

    return (
        <div className="dropdown-container">
            <div className="dropdown" onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}>
                <button className="dropdown-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </button>
                {isOpen && (
                    <ul className="dropdown-menu">
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
                <div className="popup-content">
                    <h3>
                        {selectedItem === 'AboutUs' && <div>About Us</div>}
                        {selectedItem === 'Contact' && <div>Contact Us</div>}
                    </h3>
                    
                    {selectedItem === 'AboutUs' && <div className="aboutUs"><AboutUsContent /></div>}
                    {selectedItem === 'Contact' && <div className="contact"><ContactContent /></div>}
                    
                    <button onClick={closeModal}>Close</button>
                </div>
            </Modal>

            <style>
                {`
                body {
                    overflow: ${bodyStyle.overflow};
                }
                `}
            </style>
        </div>
    );}

export default DropdownMenu;
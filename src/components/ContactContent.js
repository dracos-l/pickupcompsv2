import React from 'react';

const ContactContent = () => {
  return (
    <div class="scrollable-content">
        <ul>
          <li>Logan Dracos</li>
          {/* paragraph description */}
          <h5>
            logandracos@icloud.com
            <br></br>
            <br></br>
            <a href="https://www.linkedin.com/in/logandracos" target="_blank" rel="noopener noreferrer">
              <img src="https://static-00.iconduck.com/assets.00/linkedin-icon-1024x1024-net2o24e.png" class="linkedIn" alt="linkedInL"/>
            </a>
            <br></br>
            <br></br>
            <a href="https://www.github.com/dracos-l" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Github-512.png" class="github" alt = "linkedInL"/>
            </a>
          </h5>

          <li>Ethan Waggoner</li>
        </ul>  

    </div>
  );
};

export default ContactContent;

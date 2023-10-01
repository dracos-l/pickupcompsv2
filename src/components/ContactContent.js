import React from 'react';

const ContactContent = () => {
  return (
    <div class="scrollable-content">

  <p>Contact Us:</p>
        <ul>
          <li>Logan Dracos</li>
          {/* paragraph description */}
          <h5>
            Email: logandracos@icloud.com
            <br></br>
            <br></br>
            <a href="https://www.linkedin.com/in/logandracos" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <br></br>
            <br></br>
            <a href="https://www.github.com/dracos-l" target="_blank" rel="noopener noreferrer">Github</a>
          </h5>

          <li>Ethan Waggoner</li>
        </ul>  

    </div>
  );
};

export default ContactContent;

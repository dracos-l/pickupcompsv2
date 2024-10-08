import React from 'react';

const ContactContent = () => {
  return (
    <div class="scrollable-content">
        <ul>
          <li>Logan Dracos</li>
          {/* paragraph description */}
          <h5>
            logan.dracos@duke.edu
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
          <h5>
            waggonere@uchicago.edu
            <br></br>
            <br></br>
            <a href="https://www.linkedin.com/in/ethan-waggoner-a6136627b/" target="_blank" rel="noopener noreferrer">
              <img src="https://static-00.iconduck.com/assets.00/linkedin-icon-1024x1024-net2o24e.png" class="linkedIn" alt="linkedInL"/>
            </a>
            <br></br>
            <br></br>
            <a href="https://github.com/Edubs2003" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Github-512.png" class="github" alt = "linkedInL"/>
            </a>
          </h5>

          <li>Jordan Wasserberger</li>
          <h5>
            jwasserberger@college.harvard.edu
            <br></br>
            <br></br>
            <a href="https://www.linkedin.com/in/jordan-wasserberger-b41113243?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer">
              <img src="https://static-00.iconduck.com/assets.00/linkedin-icon-1024x1024-net2o24e.png" class="linkedIn" alt="linkedInL"/>
            </a>
          </h5>
        </ul>  

    </div>
  );
};

export default ContactContent;

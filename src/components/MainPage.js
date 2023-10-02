import React from 'react';
import Intro from './Intro'

function MainPage() {
  return (
    
    <div className="main-container">
      <div class="Intro">
        <Intro />
      </div>

      {/* Main Content Section */}
      <main>
        <section id="about">
          <h2>About Us</h2>
          <p>Lets get this shit. Lets get this shit. Lets get this shit. Lets get this shit. </p>
        </section>

        <section id="services">
          <h2>Our Services</h2>
          <ul>
            <li>Service 1</li>
            <li>Service 2</li>
            <li>Service 3</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default MainPage;

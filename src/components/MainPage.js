import React from 'react';
import Intro from './Intro'

function MainPage() {
  return (
    
    <div className="main-container">
      <div class="intro-container">
        <Intro />
      </div>

      {/* Main Content Section */}
      <main>
        <section id="form-container">
          <h2>This is where the form goes, probably a separate JS element file.</h2>
          <p>Lets get this shit. Lets get this shit. Lets get this shit. Lets get this shit. </p>
        </section>
      </main>
    </div>
  );
}

export default MainPage;

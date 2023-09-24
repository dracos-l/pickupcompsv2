import React from 'react';

function MainPage() {
  return (
    <div className="main-container">

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


      {/* Footer Section */}
      <footer>
        <p>&copy; {new Date().getFullYear()} My dick</p>
      </footer>
    </div>
  );
}

export default MainPage;

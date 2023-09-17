import React from 'react';

function MainPage() {
  return (
    <div className="main-container">
      {/* Header Section */}
      <header>
        <h1>Welcome to Our Website</h1>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content Section */}
      <main>
        <section id="about">
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit....</p>
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
        <p>&copy; {new Date().getFullYear()} Your Website Name</p>
      </footer>
    </div>
  );
}

export default MainPage;

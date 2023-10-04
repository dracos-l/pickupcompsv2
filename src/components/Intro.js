import React from 'react';

function Intro() {
  return (
    <div class = "intro">
        <h1>My Video Page</h1>
      <main>
        <section>
          <h2>Embedded Video</h2>
          {/* Replace the src attribute with your video's embed URL */}
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/your-video-id"
            title="Embedded Video"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </section>
      </main>
    </div>
  );
}

export default Intro;

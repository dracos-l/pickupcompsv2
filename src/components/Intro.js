import React from 'react';
import { Link } from 'react-router-dom';

function Intro() {
  return (
    <div class = "intro">
      <main>
        <section>
          <h2>"How to Video" or whatever we decide to do w that</h2>
          {/* Replace the src attribute with your video's embed URL */}
          <div class="video">
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/BKYJ5AIOU9I"
                title="Embedded Video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
          </div>
        </section>
        <Link to="/Form" style={{textDecoration:'none'}}>
          <button class="startButton" > Get Started! </button>
        </Link>
      </main>
    </div>
  );
}

export default Intro;

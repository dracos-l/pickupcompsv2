import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Intro() {
  const navigate = useNavigate();

  return (
    <div class = "intro">
      <main>
          <h2>Welcome! Be sure to watch the walkthrough video below:</h2>
          <div class="video">
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/PcRjJ1PDYJs?si=MzPB7P0LQCqRFCAU"
                title="Embedded Video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
          </div>
        <div className = "introButtons">
        <Link to="/Form/Paint" style={{textDecoration:'none'}}>
          <button class="startButton" > Start New Form </button>
        </Link>
        <Link to="/Edit" style={{textDecoration:'none'}}>
          <button class="editButton"> Edit Existing Form </button>
        </Link>
        </div>
      </main>
    </div>
  );
}

export default Intro;

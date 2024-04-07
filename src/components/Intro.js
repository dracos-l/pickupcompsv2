import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Intro() {
  const navigate = useNavigate();
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  const handleEditClick = () => {
    if(!hasBeenClicked){
      alert("Notice: You are skipping to the edit page. If this is your first time using this form, please click 'Start New Form' instead.");
      setHasBeenClicked(true);
    }
    else{
      navigate(`/Edit`);
    }
  };

  return (
    <div class = "intro">
      <main>
        <section>
          <h2>Introduction Video</h2>
          {/* Replace the src attribute with your video's embed URL */}
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
        </section>
        <div className = "introButtons">
        <Link to="/Form/Paint" style={{textDecoration:'none'}}>
          <button class="startButton" > Start New Form </button>
        </Link>
          <button class="editButton" onClick={handleEditClick}> Edit Existing Form </button>
        </div>
      </main>
    </div>
  );
}

export default Intro;

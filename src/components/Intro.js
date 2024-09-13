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
                src={require(`./videos/Intro_Video.mp4`)}
                title="Embedded Video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
          </div>
        <div class="introText">
        <h3>How it Works</h3>
          <p>
            Instead of asking absolute questions like how many shots you took and what was your three point percentage, we ask relative questions about how you compare to other players you play against.
            The best way to think about it is out of the ten players you play against, how do you rank among them in specific asepcts of basketball. <br/><br/>
            We break down the game into 12 categories and ask 2 questions per category. For most categories, this is broken down into some form of volume and efficiency.
            For example, for open shots we ask how often you take open shots and how often you make them. 
            I (Ethan) personally take a lot of open shots because I run around a lot, set a lot of screens and honestly just get left open a lot. 
            At the same time, if better shooters were left open as much as I was, they would make a lot more of them than I do. But they don't get as open because they generally don't play like me and have better defenders on them.
            So, I ranked by volume of open shots at 80th percentile and my efficiency at 50th percentile (mostly because not a lot of my friends are actually good scorers). <br/><br/>
            After you answer all the questions, we compare you to every player in the NBA that qualified to be in our dataset based on games and minutes played. We take your absolute distance from them in each category, then sum these distances and take the weighted average to get a similarity score. <br />
          </p>
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

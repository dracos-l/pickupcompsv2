import React from 'react';

const AboutProjContent = () => {
  return (
    <div class='about'>
        <h1>About Project Page</h1>
        <h2>Philosphy</h2>
        <p>
          From a philosphical standpoint, our goal was to take the debate you have at the courts about who you play like more serious level than anyone has before us.
          Other website that compare you to NBA players are buzz-feed style quizzes that are fun but not very accurate. Where are you from? What's your favorite color? What's your favorite food? These are all questions that are fun to answer but don't really have anything to do with how you play basketball.
          We wanted to take a more accurate, data-driven approach to this question. Our goal was to answer questions hoopers would actually know about there game but that were also relevant in differentiating between play styles, strengths and weaknesses.
          We guarentee that if you are genuiely honest about your game, we can give you a more accurate list of players you play like than any other website in the world.
        </p>
        <h2>Front-End</h2>
        <p>The front-end is honestly the easiest part. I just used Chat GPT to pick the prettiest colors</p>
        <h2>Back-End</h2>
        <p>The back-end connects to an API that scraped all of NBA.com’s stats from their website. Using this API, I compiled a file of all relevant stats for every player that qualified and converted this to percentiles on where they ranked for each stat. I then created a JS file with functions that our react website could use in order to calculate a display of the top ten players the users are similar too and specific highlights like what categories the user and top player had most and least in common. </p>
    </div>
  );
};

export default AboutProjContent;

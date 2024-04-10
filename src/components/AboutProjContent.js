import React from 'react';

const AboutProjContent = () => {
  return (
    <div class='about'>
        <h1>About Project Page</h1>
        <h3>Philosophy</h3>
        <p>
          From a philosphical standpoint, our goal was to take the debate you have at the courts about who you play like more serious level than anyone has before us.
          Other website that compare you to NBA players are buzz-feed style quizzes that are fun but not very accurate. 
          Where are you from? What's your favorite color? What's your favorite food? 
          These are all questions that are fun to answer but don't really have anything to do with how you play basketball.
          We wanted to take a data-driven approach to this question. Our goal was to answer questions hoopers would actually know about there game but that were also relevant in differentiating between play styles, strengths and weaknesses.
          We guarentee that if you are genuiely honest about your game, we can give you a more accurate list of players you play like than any other website in the world.
        </p>
        <h3>How it Works</h3>
        <p>
          Instead of asking absolute questions like how many shots you took and what was your three point percentage, we ask relative questions about how you compare to other players you play against.
          The best way to think about it is out of the ten players you play against, how do you rank among them in specific asepcts of basketball.
          We break down the game into 12 categories and ask 2 questions per category. For most categories, this is broken down into some form of volume and efficiency.
          For example, for open shots we ask how often you take open shots and how often you make them. 
          I (Ethan) personally take a lot of open shots because I run around a lot, set a lot of screens and honestly just get left open a lot. 
          At the same time, if better shooters were left open as much as I was, they would make a lot more of them than I do. But they don't get as open because they generally don't play like me and have better defenders on them.
          So, I ranked by volume of open shots at 80th percentile and my efficiency at 50th percentile (mostly because not a lot of my friends are actually good scorers). 
          After you answer all the questions, we compare you to every player in the NBA, that qualified to be in our dataset based on games and minutes played, by taking your absolute distance from them in each category.
          We then sum these distances and take the weighted average to get a similarity score. 
        </p>
        <h3>Front-End</h3>
        <p>The front-end is honestly the easiest part. I just used Chat GPT to pick the prettiest colors</p>
        <h3>Back-End</h3>
        <p>
          The back-end connects to an API that scraped all of NBA.com’s stats from their website. 
          Using this API, I compiled a file of all relevant stats for every player that qualified and converted this to percentiles on where they ranked for each stat. 
          I then created a JS file with functions that our react website could use in order to calculate a display of the top ten players the users are similar too and specific highlights like what categories the user and top player had most and least in common.
        </p>
    </div>
  );
};

export default AboutProjContent;

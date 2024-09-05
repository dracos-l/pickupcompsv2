import React from 'react';

const AboutProjContent = () => {
  return (
    <div class="aboutWrapper">
      <div class='about'>
          <h3>Philosophy</h3>
          <p>
            From a philosphical standpoint, our goal was to take the debate you have at the courts about who you play like more serious level than anyone has before us.
            Other websites that compare you to NBA players are buzz-feed style quizzes that are fun but not very accurate. <br/><br/>
            Where are you from? What's your favorite color? What's your favorite food? These are all questions that are fun to answer but don't really have anything to do with how you play basketball. <br/><br/>
            We wanted to take a data-driven approach to this question. Our goal was to answer questions hoopers would actually know about there game but that were also relevant in differentiating between play styles, strengths and weaknesses. <br/><br/>
            We guarentee that if you are genuiely honest about your game, <b>we can give you a more accurate list of players than any other website in the world.</b> <br/>
          </p>
          <h3>Philosophical Issues</h3>
          <p>
            Our main philosophical roadblock stemmed from one issue: that pickup ball isn't the same game as the NBA. Concepts of spacing, specific actions, defensive schemes, and more are not present when you're just playing a game of 3s with your buddies.
            Or even worse, when you have to play with people you don't know and alter your game because of it. Aaron Gordon plays the same role every game, but we really don't in casual basketball. <br/> <br/> 
            More issues grew from this one. Since we are using data about the NBA, is pick-and-roll data really that valuable when considering how different pick-and-rolls are in the NBA? Does your height really matter, even if we adjusted it to NBA average?
            If that was the case, someone who's 5'11 would be compared to a lot of larger wings, even if they might be more similar to a playmaking guard. <br/> <br/>
            Another issue that we spent many nights debating is how a casual hooper percieves themself. If we asked you simply "How good are you at passing?" most people would overestimate their abilities. We had to frame the quesitons in a way that would make people think about their game in a more objective way. <br/> <br/>
            I could go on and on about the extensive conversations the two of us have had about perfecting the method of answering our guiding question (Of course being "how can I make a website that tells me I am Lebron James"), but I think you get the point. <br/> 
          </p>
          <h3>Front-End</h3>
          <p> 
            I (Logan) created our frontend using React with <a href="https://www.npmjs.com/package/react-router-dom" target="_blank">react-router-dom</a> for routing, <a href="https://sass-lang.com" target="_blank">sass</a> for styling, and a few other small things for certain functionalities on the webpage, such as Modal and various hooks. <br/> <br/>
            There were many times I wanted to get much fancier with the styling and animations, but I had to remind myself (and Ethan had to remind me) that the main goal of the website was to be informative and easy to use. Our guiding philosophy was to make this website as direct and clear as possible, so I had to keep the design simple. <br/> <br/>
            Being one of the first times I've designed a website, there were many issues with spacing, flexboxes, dropdown menus, and more that I had to learn on the fly. If you've never designed a website from scratch before, you'd be surprised at how long it takes to make everything look good on any size screen. <br/> <br/>
            I'm proud of the final product, and as we continue to improve both the front and back end, I'm sure I'll be able to make it even better. After all, this is only version 2! (see version 1 <a href= "https://dracos-l.github.io/Pickup_Comps/" target="_blank">here</a> (<b>WARNING: It is ugly and much worse than this version</b>)) <br/>
          </p>
          <h3>Back-End</h3>
          <p>
            The back-end connects to an API that scraped all of NBA.com’s stats from their website, link here: <a href = "https://github.com/swar/nba_api" target="_blank">NBA API github</a>. 
            Using this API, I compiled a file of all relevant stats for every player that qualified and converted this to percentiles on where they ranked for each stat. 
            I then created a JS file with functions that our react website could use in order to calculate a display of the top ten players the users are similar too and specific highlights like what categories the user and top player had most and least in common.
          </p>
      </div>
    </div>
  );
};

export default AboutProjContent;

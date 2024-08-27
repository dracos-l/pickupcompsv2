import React from 'react';

const AboutUsContent = () => {
  return (
    <div class="scrollable-content">

        <p>Developers:</p>
        <ul>
          <li>Head Frontend Developer: Logan Dracos</li>
          {/* paragraph description */}
          <h5>
            Currently studying at Duke University and planning to major in Computer Science with a minor in Finance. 
            <br></br>
            <br></br>
            Avid Celtics fan and just love the NBA and its analytics. Originally got interested in NBA deep-dives through Ben Taylor's Thinking Basketball podcast.
            <br></br>
            <br></br>
            Main coding experience using react and python for projects similar to this one (check out my github linked in contact us).
            <br></br>
            <br></br>
            Favorite player: Jayson Tatum
            <br></br>
            <br></br>
            Player Comp: Grant Williams (I cried when I got this)

          </h5>

          <li>Head Backend Developer: Ethan Waggoner</li>
          {/* paragraph description */}
          <h5>  
            Currently a Data Science and Business Economics Major at the University of Chicago
            <br></br>
            <br></br>
            Bigger Basketball Analytics and Celtics fan than Logan.
            <br></br>
            <br></br>
            I am currently working as a Technology Operations Analyst at Arcesium
            <br></br>
            <br></br>
            Favorite player: Jayson Tatum (NBA Champion)
            <br></br>
            <br></br>
            Player Comp: Jalen Suggs 
          </h5>
        </ul>  

    </div>
  );
};

export default AboutUsContent;

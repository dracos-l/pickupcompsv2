# Welcome to Pickup Comps!

## Overview

Welcome to our Player Comparison Website! This project, developed by [Logan](https://www.github.com/dracos-l) (Head of Frontend) and [Ethan](https://github.com/Edubs2003) (Head of Backend), aims to provide users with accurate NBA player comparisons based on their basketball skills and playing style. Our data-driven approach ensures meaningful and precise comparisons, going beyond the trivial questions used by other sites.

## Philosophy

### The Concept

Our goal was to create a serious and accurate comparison tool for basketball enthusiasts. Unlike other comparison sites that ask arbitrary questions, we focus on the real aspects of your game that can be drawn to real data from the NBA. By answering questions about your playing style, strengths, and weaknesses, we can provide a comparison that is both meaningful and precise.

### The Approach

We ask relative questions about how you compare to other players you play against, breaking the game down into 12 categories with two questions per category, focusing on volume and efficiency. This approach ensures a comprehensive assessment of your basketball skills by focusing on how you actually play.

## How It Works

After you answer all the questions, we compare your responses to every player in our NBA dataset that meets a minute and game qualification. We provide a ranked list of the top ten players you are most similar to, along with highlights of your most and least correlated categories.

## Front-End

The front-end, developed by Logan, uses React with [react-router-dom](https://www.npmjs.com/package/react-router-dom) for routing and [Sass](https://sass-lang.com) for styling. Our design philosophy prioritizes simplicity and clarity, ensuring the website is easy to use and navigate.

## Back-End

The back-end, developed by Ethan, connects to an API that scrapes NBA stats from [NBA.com](https://github.com/swar/nba_api). We compiled relevant stats for every player and converted these to percentiles, ranking each stat. Our backend functions calculate and display the top ten players you match up with, highlighting specific similarities.

<br>
<br>

Thank you for visiting!

Logan & Ethan

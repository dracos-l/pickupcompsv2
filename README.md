# Player Comparison Website

## Overview

Welcome to our Player Comparison Website! This project, developed by Logan (Head of Frontend) and Ethan (Head of Backend), aims to provide users with a more accurate comparison to NBA players based on their own basketball skills and playing style. Unlike other comparison sites that rely on trivial questions, our site uses a data-driven approach to offer meaningful and precise player comparisons.

## Philosophy

### The Concept

Our primary goal was to elevate the debate about player comparison to a more serious level than anyone has before. Most websites that compare you to NBA players are fun but not very accurate, often using unrelated questions such as your favorite color or food.

We wanted to focus on the real aspects of your game, asking questions that are relevant in differentiating between play styles, strengths, and weaknesses. Our approach ensures that if you are genuinely honest about your game, we can provide a more accurate list of players than any other website.

### Philosophical Issues

We faced several philosophical challenges, the most significant being that pickup basketball is different from the NBA. Concepts like spacing and defensive schemes are less prevalent in casual games. This difference raised questions about the relevance of certain data points, such as pick-and-roll efficiency or height adjustments.

Another major challenge was framing questions in a way that encourages objective self-assessment. We spent countless hours debating how to perfect our method to ensure that our comparisons are meaningful and accurate.

## How It Works

Instead of asking absolute questions like your shooting percentage, we ask relative questions about how you compare to other players you play against. We break the game down into 12 categories and ask two questions per category, focusing on volume and efficiency.

After answering all the questions, we compare you to every player in our NBA dataset. We calculate your similarity to each player based on your answers, providing a ranked list of the top ten players you are most similar to, along with highlights of your strengths and weaknesses.

## Front-End

The front-end, developed by Logan, uses React with [react-router-dom](https://www.npmjs.com/package/react-router-dom) for routing and [Sass](https://sass-lang.com) for styling. Despite the temptation to create fancy designs and animations, we prioritized simplicity and clarity to make the website informative and easy to use.

Designing this website was a learning experience, especially in dealing with issues like spacing, flexboxes, and dropdown menus. The final product is something we are proud of, and we look forward to further improvements in future versions.

You can see version 1 [here](https://dracos-l.github.io/Pickup_Comps/) (**WARNING: It is ugly and much worse than this version**).

## Back-End

The back-end, developed by Ethan, connects to an API that scrapes NBA stats from [NBA.com](https://github.com/swar/nba_api). We compiled relevant stats for every player and converted these to percentiles, ranking each stat. 

Using these stats, we created functions that our React frontend can use to calculate and display the top ten players users are similar to, highlighting the specific categories where users and their top comparison have the most and least in common.

## Conclusion

We are excited to share our project with you and believe it offers a unique and accurate way to compare your basketball skills to those of NBA players. We hope you enjoy using it and find the comparisons insightful.

Thank you for visiting!

Logan & Ethan

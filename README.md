# YouTwitch
Video Sharing platform that combines content from Youtube and Twitch

This application allows users to find live streams on the two most popular sites on the internet (Youtube & Twitch) so that instead of having to access both sites separately, users are able to search all active live streams under one simple website.


## About the Project
This application is designed to take in an entered query in the search bar. It has a signup page and login page that adds and authenticates users. It was built using  **Node** and **express** server, **Handlebars.js** as the template engine, **MySQL** with a **Sequelize ORM**, deployed with **Heroku**, **ytsearcher** and **twitch** node library/package, **Materliaze CSS framework**, **and Javascript**. The aim of this project was to retrieve data from two API's and with interaction from the user return and display appropriate data.

## Features 
 * Allows users to create an account
 * Authenticates user info on login
 * Takes user input to generate a list based on those queries
 * A display of livestreams from Youtube and Twitch
 * Selecting a video pops open a modal
 * Allows users to save videos in favourites
 * Uses client side storage to store persistant data
 * Comes with dark mode and light mode
 * Uses Materialize for CSS framework
 * Protects API keys in Node with environment variables
 * Has a folder structure that meets the MVC paradigm
 

### Screenshots
![Screenshot of Youtwitch Login Page.](/public/images/youtwitchlogin.png "Screenshot of Youtwitch Login Page")

![Screenshot of Youtwitch Members Page.](/public/images/youtwitchhomepage.png "Screenshot of Youtwitch Members Page")

## URL
The live project can be viewed here: 
[Deployed Site](https://enigmatic-stream-39845.herokuapp.com/)


## Authors
Authors: Manuel Leung Chen (GitHub username: manuelleungchen), Jhonny Lin (Github username: Jlin72), Karl Emmanuel Tulio (Github username: fulcrum-ctrl), Faizah Kibria(Github username: fkibria)


## License
This source code is available to all and the project is licensed under the MIT License - see the LICENSE.md file for details
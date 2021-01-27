// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

//Parameters required to use the ytsearcher npm libraryry
require('dotenv').config();
const {YTSearcher} = require('ytsearcher');
const API_KEY = process.env.API_KEY;
const searcher = new YTSearcher(API_KEY);


// For Twitch npm 
const TwitchApi = require("node-twitch").default;
const db = require("../models");
const twitch = new TwitchApi({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
});


module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render('signup');
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {

      res.redirect("/members");
    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render('login');
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
      
    const videosData = [];

    // The a list of tope games
    twitch.getTopGames().then(topGames => {
        // Pick a randow index element from topGames
        const randomIndex = Math.floor(Math.random() * topGames.data.length);

        // Get videos from selected index
        twitch.getVideos({
            game_id: topGames.data[randomIndex].id,
            first: "3",
            // type: "highlight"
        }).then(videosResult => {

            videosResult.data.forEach(video => {
                const width = /(%{width})/g;
                const height = /(%{height})/g;

                let thumbnails = video.thumbnail_url.replace(width, "320");
                thumbnails = thumbnails.replace(height, "180");

                videosData.push({
                    url: video.url,
                    id: video.id,
                    title: video.title,
                    thumbnails: thumbnails,
                    frameSrc: `https://player.twitch.tv/?video=${video.id}&parent=localhost&autoplay=false`
                })
            })

            // Start the search from Youtube
            searcher.search(topGames.data[randomIndex].name, {
                eventType: 'live',
                type: 'video'
            }).then(result => {

                result.currentPage.forEach(result => {
                    videosData.push({
                        url: result.url,
                        id: result.id,
                        title: result.title,
                        thumbnails: result.thumbnails.medium.url,
                        frameSrc: `https://www.youtube.com/embed/${result.id}?autoplay=0`
                    });
                });
                res.render('members', { link: videosData });

            }).catch(err => console.log(err));
        })
    })
  });

//   app.get("/logout", isAuthenticated, function(req, res) {
//     res.render('login')
//   });

  app.get('/members/:query', isAuthenticated, (req,res)=> {
    const data = [];

        searcher.search(req.params.query, {
            eventType: 'live',
            type: 'video'
        }).then(result => {
            result.currentPage.forEach(result => {
                data.push({
                    url: result.url,
                    id: result.id,
                    title: result.title,
                    thumbnails: result.thumbnails.medium.url
                });
            });
            //This function will shuffle the data
            function shuffle(a) {
                for (let i = a.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [a[i], a[j]] = [a[j], a[i]];
                }
                return a;
            }
            shuffle(data);

            res.render('search_results', {
                link: data
            });
        }).catch(err=>console.log(err)); 
    });

    app.get("/members/favorites/:member_name", isAuthenticated, (req,res) => {
        db.User.findOne({
            where: {
                email: req.params.member_name
            }
        }).then(result=> {
            console.log(result.dataValues);
            db.saved.findAll({
                where: {
                    UserId: result.dataValues.id
                }
            }).then(data=> {
                // res.send(data);
                const values = [];
                data.forEach(element => {
                    values.push({
                        frameSrc: element.videos,
                        thumbnails: element.thumbnail,
                        title: element.title
                    });
                })
                res.render('favorites', {link: values});
            }).catch(err=>console.log(err));
        }).catch(err=> console.log(err));
    })

};

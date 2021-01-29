// Parameters required to use the ytsearcher npm libraryry
require('dotenv').config();
const { YTSearcher } = require('ytsearcher');

const { API_KEY } = process.env;
const searcher = new YTSearcher(API_KEY);

// For Twitch npm
const TwitchApi = require('node-twitch').default;
const db = require('../models');

const twitch = new TwitchApi({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = (app) => {
  app.get('/', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/members');
      // res.redirect("/members/videos");
    }
    res.render('signup');
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get('/login', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/members');
      // res.redirect("/members/videos");
    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render('login');
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access, redirect to signup.
  app.get('/members', isAuthenticated, (req, res) => {
    const videosData = [];

    // The a list of top games
    twitch.getTopGames().then((topGames) => {
      // Pick a randow index element from topGames
      const randomIndex = Math.floor(Math.random() * topGames.data.length);

      // Get videos from selected index
      twitch.getVideos({
        game_id: topGames.data[randomIndex].id,
        first: '5', // Limit results to 5
        sort: 'views',
      }).then((videosResult) => {
        videosResult.data.forEach((video) => {
          const width = /(%{width})/g;
          const height = /(%{height})/g;

          let thumbnails = video.thumbnail_url.replace(width, '320');
          thumbnails = thumbnails.replace(height, '180');

          videosData.push({
            url: video.url,
            id: video.id,
            title: video.title,
            thumbnails,
            frameSrc: `https://player.twitch.tv/?video=${video.id}&parent=localhost&autoplay=false`,
          });
        });

        // Start the search from Youtube
        searcher.search(topGames.data[randomIndex].name, {
          eventType: 'live',
          type: 'video',
        }).then((result) => {
          result.currentPage.forEach((data) => {
            videosData.push({
              url: data.url,
              id: data.id,
              title: data.title,
              thumbnails: data.thumbnails.medium.url,
              frameSrc: `https://www.youtube.com/embed/${data.id}?autoplay=0`,
            });
          });
          // This function will shuffle the data
          function shuffle(a) {
            // eslint-disable-next-line
            for (let i = a.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              // eslint-disable-next-line
              [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
          }
          shuffle(videosData);

          res.render('members', { link: videosData });
          // eslint-disable-next-line
        }).catch((err) => console.log(err));
      });
    });
  });

  app.get('/logout', isAuthenticated, (req, res) => {
    res.render('login');
  });

  // Route for searching videos from Youtube and Twitch API
  app.get('/members/:query', isAuthenticated, (req, res) => {
    const videosData = [];

    // Get the Game ID on Twitch API
    twitch.getGames(req.params.query).then((game) => {
      // Get Video by Game ID
      twitch.getVideos({
        game_id: game.data[0].id,
        first: '5', // Limit result to 5 videos
        sort: 'views',
      }).then((videosResult) => {
        videosResult.data.forEach((video) => {
          const width = /(%{width})/g;
          const height = /(%{height})/g;

          let thumbnails = video.thumbnail_url.replace(width, '320');
          thumbnails = thumbnails.replace(height, '180');

          videosData.push({
            url: video.url,
            id: video.id,
            title: video.title,
            thumbnails,
            frameSrc: `https://player.twitch.tv/?video=${video.id}&parent=localhost&autoplay=false`,
          });
        });

        // Start the search from Youtube
        searcher.search(req.params.query, {
          eventType: 'live',
          type: 'video',
        }).then((result) => {
          result.currentPage.forEach((data) => {
            videosData.push({
              url: data.url,
              id: data.id,
              title: data.title,
              thumbnails: data.thumbnails.medium.url,
              frameSrc: `https://www.youtube.com/embed/${data.id}?autoplay=0`,
            });
          });

          // This function will shuffle the data
          function shuffle(a) {
            // eslint-disable-next-line
            for (let i = a.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              // eslint-disable-next-line
              [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
          }
          shuffle(videosData);

          res.render('members', { link: videosData });
          // eslint-disable-next-line
        }).catch((err) => console.log(err));
      });
    });
  });

  app.get('/members/favorites/:member_name', isAuthenticated, (req, res) => {
    db.User.findOne({
      where: {
        email: req.params.member_name,
      },
    }).then((result) => {
      db.saved.findAll({
        where: {
          UserId: result.id,
        },
      }).then((data) => {
        const values = [];
        data.forEach((element) => {
          values.push({
            frameSrc: element.videos,
            thumbnails: element.thumbnail,
            title: element.title,
          });
        });
        res.render('favorites', { link: values });
        // eslint-disable-next-line
      }).catch((err) => console.log(err));
      // eslint-disable-next-line
    }).catch((err) => console.log(err));
  });
};

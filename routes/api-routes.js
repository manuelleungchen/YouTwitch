// Requiring our models and passport as we've configured it
const db = require('../models');
const passport = require('../config/passport');

module.exports = (app) => {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.json(req.user);
  });

  // Route for signing up a user.
  // The password will be safely hashed by the user model.
  // if there is an error it will send back an error
  app.post('/api/signup', (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        res.redirect(307, '/api/login');
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // Route for getting some data about our user to be used client side
  app.get('/api/user_data', (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        darkmode: req.user.darkmode,
      });
    }
  });

  // Route to save user videos
  // eslint-disable-next-line no-unused-vars
  app.post('/api/saved', (req, res) => {
    db.User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((result) => {
      db.saved.create({
        UserId: result.dataValues.id,
        videos: req.body.video,
        thumbnail: req.body.thumbnail,
        title: req.body.title,
      }).then((data) => {
        res.json(data);
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
  });

  // Route to update darkmode preference
  app.put('/api/darkmode', (req, res) => {
    db.User.update(
      {
        darkmode: req.body.darkmode,
      },
      {
        where: {
          id: req.body.id,
        },
      },
      // eslint-disable-next-line
      (result) => {
        if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
      },
    );
  });

  // Delete route for favorites
  app.delete('/api/saved/:src', ({ params }, res) => {
    let decoded = decodeURIComponent(params.src);
    db.saved.destroy({
      where: {
        thumbnail: decoded,
      },
    })
      .then((result) => res.json(result));
  });
};

// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

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
      
    res.render('search');
    // res.sendFile(path.join(__dirname, "../public/members.html"));
  });

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
        });        
});

};

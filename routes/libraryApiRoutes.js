
var db = require("../models");

module.exports = function(app) {  

      // POST route for saving a new book
  app.post("/api/library", function(req, res) {
      console.log(req.body);
    db.Library.create({
        book_title: req.body.book_title,
        author: req.body.author,
        book_link: req.body.book_link,
        UserId: req.user.id
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  
  
  
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
        console.log("User data, library api route:" + req.user);
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        user_name: req.user.user_name,
        id: req.user.id
      });
    }
  });
  
  
};

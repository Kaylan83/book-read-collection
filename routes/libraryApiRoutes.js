
var db = require("../models");

module.exports = function(app) {  

      // POST route for saving a new book
  app.post("/api/library", function(req, res) {
    console.log(req.body)
    db.Post.create({
        book_title: req.body.book_title,
        author: req.body.author,
        book_link: req.body.book_link
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

};
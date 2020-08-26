
var db = require("../models");

module.exports = function(app) {  

      // POST route for saving a new book
  app.post("/api/library", function(req, res) {
    db.Library.create({
        book_title: req.body.book_title,
        author: req.body.author,
        book_link: req.body.book_link,
        UserId: req.user.id
    }).then(function(data) {
      res.json(data);
    });
    

  });
  
  
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        user_name: req.user.user_name,
        id: req.user.id
      });
    }
  });
  
  
  app.delete("/api/library/:id", function(req, res) {
    console.log(req.params.id);
    db.Library.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(data) {
        res.json(data);
      });
  });

  app.put("/api/library/:id", function(req,res){
    db.Library.update(req.body,{
      where: {
        id: req.params.id
      }
    }).then(function(data){
      res.json(data);
    })
  })
  
  
  //Delete account button
  // app.delete("/api/library/:id", function(req, res) {
  //   db.Library.destroy({
  //     where: {
  //       UserId: req.params.id
  //     }
  //   }).then(function(data){
  //     res.json(data);
  //   })
  // });
  
  
};

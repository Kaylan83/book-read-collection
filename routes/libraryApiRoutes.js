
var db = require("../models");

module.exports = function(app) {  

      // POST route for saving a new book
  app.post("/api/library", function(req, res) {
    db.Library.create({
        book_title: req.body.book_title,
        author: req.body.author,
        book_link: req.body.book_link,
        UserId: req.user.id
    }).then(function(dbPost) {
      res.json(dbPost);
    });
    

  });
  
  
//   app.get("/api/library", function(req, res) {
//       console.log("############Query:", req.query.UserId);
//       var query = {};
//         if (req.user.id) {
//         query.UserId = req.user.id;
//       }
    
//     db.Library.findAll({
//          where: query,
//          include: [db.Users]
//       }).then(function(dbPost) {
//           // console.log(dbPost);
//         res.json(dbPost);
//       });   

//   });
  
  
  
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
  
  
};

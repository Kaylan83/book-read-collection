
var db = require("../models");

module.exports = function(app) {  
    
    app.post("/api/users", function(req, res) {
        console.log(req.body);
        // create takes an argument of an object describing the item we want to
        // insert into our table. In this case we just we pass in an object with a text
        // and complete property (req.body)
        db.Users.create({
          user_name: req.body.user_name,
          password: req.body.password,
          first_name: req.body.first_name,
          last_name: req.body.last_name
        }).then(function(dbUser) {
          // We have access to the new todo as an argument inside of the callback function
          res.json(dbUser);
        });
      });

};
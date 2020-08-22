
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {  
    
    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
          user_name: req.user.user_name,
          id: req.user.id
        });
      });
    
    app.get("/api/users", function(req, res) {
        console.log(req.body);
        
        db.Users.findOne({
            where: {
                user_name: req.body.user_name
            }
        }).then(function(dbTodo) {
            // We have access to the todos as an argument inside of the callback function
            res.json(dbTodo);
          });
        
    });
    
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
    
    //Logout get request
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
      });

};
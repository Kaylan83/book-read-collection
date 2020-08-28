
var db = require("../models");
var passport = require("../config/passport");
const { RSA_NO_PADDING } = require("constants");

module.exports = function(app) {  
  var user_id =""
    
    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
          user_name: req.user.user_name,
          id: req.user.id
        });

        user_id = req.user.id;
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
          }).catch(function(err) {
            res.status(401).json(err);
          })
        
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
          // line 47 is for the future functionality forgot password
          //,security_answer: req.body.security_answer
        }).then(function(dbUser) {
          // We have access to the new todo as an argument inside of the callback function
          res.json(dbUser);
        }).catch(function(err) {
          res.status(401).json(err);
        });
    });
    
    //Logout get request
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
      });

      app.delete("/api/users" , function(req, res) {
        db.Library.destroy({
          where: {
            UserId: user_id
          }
        }).then(function(data){
          res.json(data);

                          
        db.Users.destroy({
          where: {
            id: user_id
          }
        })
          .then(function(data) {
            res.json(data);
          res.redirect("/");
          });
        })
      });

};
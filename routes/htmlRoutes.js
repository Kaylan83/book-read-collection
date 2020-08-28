var isAuthenticated = require("../config/middleware/isAuthenticated");
var db = require("../models");

module.exports = function(app) {  
    app.get("/", function(req, res) {
        if (req.user) {
            res.redirect("/library");
          }  
        res.render("index");
    });

    app.get("/library", isAuthenticated, function(req,res){
        var query = {};
        if (req.user.id) {
            query.UserId = req.user.id;
        }
        
        db.Library.findAll({
            where: query,
            include: [db.Users]
        }).then(function(data) {
                       
            var bookObj = { 
                book: data,
            };      
            res.render("userPage", bookObj);   
        }); 
    });
    
    
};
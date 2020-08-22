var isAuthenticated = require("../config/middleware/isAuthenticated")


module.exports = function(app) {  
    app.get("/", function(req, res) {
        if (req.user) {
            res.redirect("/library");
          }
          
        res.render("index");
    });

    app.get("/library", isAuthenticated, function(req,res){
        res.render("userPage");
    });
    
    
};
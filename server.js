var express = require("express");
var session = require("express-session");
var passport = require("./config/passport");

var PORT = process.env.PORT || 8080;

var app = express();

// Requiring our models for syncing
var db = require("./models");

// Serve static content for the app from the "public" directory
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them
require("./routes/htmlRoutes.js")(app);
require("./routes/libraryApiRoutes.js")(app);
require("./routes/usersApiRoutes.js")(app);

// Start the server so that it can begin listening to client
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

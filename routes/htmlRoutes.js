var db = require("../models");

var path = require("path");

var axios = require("axios");

// content for the handlebars
var hbsContent = { userName: "", loggedin: false, title: "You are not logged in today", body: "Hello World" };

// middleware function to check for logged in users
var sessionChecker = (req, res, next) => {
  console.log(req.session);
  if (req.session.user && req.cookies.user_sid) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = function (app) {

  app.get("/", sessionChecker, (req, res) => {
    hbsContent.loggedin = true;
    hbsContent.userName = req.session.user.username;
    hbsContent.title = "You are logged in";
    console.log("index here!")


    // This is the axios get method to the Google Books API to produce the book of the month

    var bookTitle = "East of Eden";

    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + bookTitle + "&key=" + process.env.GOOGLE_API_KEY)
      .then(books => {
        // console.log(books.data.items);
        var book = books.data.items[0];
        res.render("index", { hbsContent, book });
      });

  });

//  route for user signup
app.route("/signup")
    .get((req, res) => {
      res.render("signup", hbsContent);
    })
    .post((req, res) => {
      var username = req.body.username;
      var password = req.body.password;
      console.log(username);
      console.log(password);
      console.log("this is done!")
      res.redirect("/login");
    });

  // route for user login
  app.route("/login")
    .get((req, res) => {
      // res.sendFile(__dirname + "/public/signup.html");
      res.render("login", hbsContent);
    })
    .post((req, res) => {
      var username = req.body.username;
      var password = req.body.password;
      console.log(username);

      // Upon login the data base will be searched for the UN the user put in
      db.User.findOne({ where: { username: username } }).then(function (user) {
        if (!user) {
          res.redirect("/login");
        } else if (!user.validPassword(password)) {
          res.redirect("/login");
        } else {
          req.session.user = user.dataValues;
          res.redirect("/");
        }
      });
    });

  // route for user logout
  app.get("/logout", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      hbsContent.loggedin = false;
      hbsContent.title = "You are logged out!";
      res.clearCookie("user_sid");
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });

};

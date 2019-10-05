var db = require("../models");

// content for the handlebars
var hbsContent = { userName: "", loggedin: false, title: "You are not logged in today", body: "Hello World" };

module.exports = function(app) {
  // route for the signup page
app.route("/signup")
.get((req, res) => {
  console.log("test");
  // res.sendFile(__dirname + "/public/signup.html");
  res.render("signup", hbsContent);
})
.post((req, res) => {
  console.log(db.User);
  // bcrypthash in here
  db.User.create({
    username: req.body.username,
    password: req.body.password
  })
    .then(user => {
      console.log(user.dataValues);
      console.log(req.session);
      req.session.user = user.dataValues;
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
      res.redirect("/signup");
    });
});

};

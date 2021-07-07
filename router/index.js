var session = require("express-session");
var path = require("path");
var passport = require("passport");
module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  require("./githubLogin.js")(app, passport);
  require("./googleLogin.js")(app, passport);
  require("./googleLogin.js")(app, passport);
  require("./login.js")(app, passport);
  require("./signup.js")(app, passport);

  // app.get("/", passport.authenticate("local"), function (req, res) {
  //   console.log(req.user);
  //   res.render("index.ejs", { user: req.user });
  //   // res.status(200).json({
  //   //   status: "Login successful!",
  //   // });
  // });
  app.get("/", function (req, res) {
    var name = req?.user?.name;
    console.log("req.user:", req.user);
    res.render("index.ejs", { user: req.user });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    //res.send("Goodbye!");
    var user = req.user;
    if (!user) user = "";
    res.render("index.ejs", {
      user: user,
    });
  });
};

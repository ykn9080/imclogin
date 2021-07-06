var session = require("express-session");
var path = require("path");
var passport = require("passport");
module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
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

  app.get("/", function (req, res) {
    var name = req?.user?.name;

    res.render("index.ejs", { user: {} });
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
  // app.get("/signup", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../static/signup.html"));
  // });
  // app.get("/signup1", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../static/signup1.html"));
  // });
  // app.post("/signup", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../static/signup.html"));
  // });
  // app.post("/signup1", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../static/signup1.html"));
  // });
  // app.get("/login", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../static/login.html"));
  // });
  // app.post("/login", (req, res) => {
  //   consolg.log(req.body);
  // });
};

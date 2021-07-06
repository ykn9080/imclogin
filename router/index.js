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
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../static/index.html"));
    // res.send(
    //   '<a href="/auth/google">Authenticate with Google</a><a href="/auth/github">Authenticate with Github</a>'
    // );
  });
  app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../static/register.html"));
  });
  app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../static/login.html"));
  });
  app.post("/login", (req, res) => {
    consolg.log(req.body);
  });
};

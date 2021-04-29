import session from "express-session";

module.exports = (app, passport) => {
  var passport = require("passport");

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
  app.get("/", (req, res) => {
    res.send(
      '<a href="/auth/google">Authenticate with Google</a><a href="/auth/github">Authenticate with Github</a>'
    );
  });
};
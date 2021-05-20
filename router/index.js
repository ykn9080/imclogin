var session = require("express-session");

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
  app.get("/", (req, res) => {
    res.send(
      '<a href="/auth/google">Authenticate with Google</a><a href="/auth/github">Authenticate with Github</a>'
    );
  });
};

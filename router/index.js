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
  require("./setting.js")(app, passport);

  // app.get("/", passport.authenticate("local"), function (req, res) {
  //   console.log(req.user);
  //   res.render("index.ejs", { user: req.user });
  //   // res.status(200).json({
  //   //   status: "Login successful!",
  //   // });
  // });

  app.route("/").get(async (req, res) => {
    console.log("req.flash", req.flash("success"));
    if (req.flash("success")) req.user.name = req.flash("success");
    else if (req.user && req.user.displayName)
      req.user.name = req.user.displayName;

    // layout.ejs is my version of blocking. I pass the page name as an option to render custom pages in the template
    return await res.render(`index.ejs`, { user: req.user }, (err, html) =>
      standardResponse(err, html, res)
    );
  });
  const standardResponse = (err, html, res) => {
    // If error, return 500 page
    if (err) {
      console.log(err);
      // Passing null to the error response to avoid infinite loops XP
      return res
        .status(500)
        .render(`index.ejs`, { page: "500", error: err }, (err, html) =>
          standardResponse(null, html, res)
        );
      // Otherwise return the html
    } else {
      return res.status(200).send(html);
    }
  };
  // app.router("get("/", function (req, res) {
  //   if (req.user && req.user.displayName) req.user.name = req.user.displayName;
  //   console.log("req.user:", req.user);

  //   res.render("index.ejs", { user: req.user });
  // });

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

module.exports = (app, passport) => {
  function isLoggedIn(req, res, next) {
    console.log(req.user);
    req.user ? next() : res.sendStatus(401);
  }
  require("../passport/githubauth")(app, passport);

  app.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["email", "profile"] })
  );

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", {
      successRedirect: "/admin",
      failureRedirect: "/login/github/failure",
    })
  );

  app.get("/admin", isLoggedIn, (req, res) => {
    //console.log(req);
    res.send(`Hello, success ${JSON.stringify(req.user, null, 4)}`); // );
  });

  app.get("/login/github/failure", (req, res) => {
    res.send("Failed to authenticate..");
  });
};

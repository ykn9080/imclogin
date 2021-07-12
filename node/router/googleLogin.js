module.exports = (app, passport) => {
  function isLoggedIn(req, res, next) {
    console.log("requ.user from isLoggedIn: ", req.user);
    req.user ? next() : res.sendStatus(401);
  }
  //module.exports = (app, passport) => {
  require("../passport/googleauth")(app, passport);
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/login/google/failure",
    })
  );

  // app.get("/admin", (req, res) => {
  //   console.log("req:", req);
  //   res.redirect("index.ejs", { user: { name: "req" } });
  // });

  app.get("/login/google/failure", (req, res) => {
    res.send("Failed to authenticate..");
  });
};

import fetch from "node-fetch";
import express from "express";
import session from "express-session";
//const session = require("express-session");
//var passport = require("passport");

module.exports = (app, passport) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  function isLoggedIn(req, res, next) {
    console.log(req.user);
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
      successRedirect: "/admin",
      failureRedirect: "/login/google/failure",
    })
  );

  app.get("/admin", isLoggedIn, (req, res) => {
    console.log(req);
    res.send(`Hello, success ${req.user.displayName}`); // );
  });

  app.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    res.send("Goodbye!");
  });

  app.get("/login/google/failure", (req, res) => {
    res.send("Failed to authenticate..");
  });
};

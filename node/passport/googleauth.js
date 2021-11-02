const GoogleStrategy = require("passport-google-oauth2").Strategy;
var User = require("../model/user");
const svr = process.env.HOST + ":" + process.env.PORT;

module.exports = (app, passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${svr}/auth/google/callback`,
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        User.findOne({ "google.id": profile.id }).then((currentUser) => {
          if (currentUser) {
            console.log("current user is", currentUser);
          } else {
            new User({
              "google.name": profile.displayName,
              "google.id": profile.id,
              "google.email": profile.email,
              "google.token": accessToken,
            })
              .save()
              .then((newUser) => {
                console.log("new user is:", newUser);
              });
          }
        });
        return done(null, profile);
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};

const GoogleStrategy = require("passport-google-oauth2").Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const svr = "http://" + process.env.HOST + ":" + process.env.PORT;

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

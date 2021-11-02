const GithubStrategy = require("passport-github2").Strategy;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const svr = process.env.HOST + ":" + process.env.PORT;

module.exports = (app, passport) => {
  passport.use(
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: `${svr}/auth/github/callback`,
      },
      function (request, accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
        //   return done(err, profile);
        // });
        console.log(
          "access: ",
          accessToken,
          "refresh: ",
          refreshToken,
          "profile: ",
          profile
        );
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

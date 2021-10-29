var LocalStrategy = require("passport-local").Strategy;
var User = require("../model/models").User;
// var Company = require("../model/company");
var bCrypt = require("bcrypt-nodejs");
var config = require("../config/");
var jsonUser = require("../data/imcregister.json");
const username_field = config.basic.passport.username;
const password_field = config.basic.passport.password;
module.exports = function (passport) {
  passport.use(
    "signup",
    new LocalStrategy(
      {
        // local 전략을 세움
        usernameField: username_field,
        passwordField: password_field,
        session: false, // 세션에 저장 여부
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      function (req, username, password, done) {
        console.log(req.body, username, password);
        switch (config.basic.passport.datasrc) {
          case "mongodb":
            // Company.findOne(
            //   {
            //     _id: req.body.comp,
            //   },
            //   function (err, comp) {
            //     if (err) {
            //       console.log("Error in SignUp: " + err);
            //       return done(err);
            //     }
            //     if (comp === "") {
            //       return done(null, false
            // , { message: "No such company" });
            //     }
            //   }
            // );

            findOrCreateUser = function () {
              // //company name to compcode
              // Company.findOne({ id: req.body.comp }, (err, comp) => {
              //   if (err) {
              //     console.log("Can't find company: " + err);
              //   }
              //   if (comp) req.body.comp = comp._id;
              //   else delete req.body.comp;
              // });

              // find a user in Mongo with provided username
              User.findOne(
                {
                  id: req.body.username,
                },
                function (err, user) {
                  // In case of any error, return using the done method
                  console.log("userfindone:", user);
                  if (err) {
                    console.log("Error in SignUp: " + err);
                    return done(err);
                  }
                  // already exists
                  if (user) {
                    console.log(
                      "User already exists with id: " + req.body.username
                    );
                    return done(
                      null,
                      false,
                      //req.flash("message", "User Already Exists")
                      "User Already Exists"
                    );
                  } else {
                    // if there is no user with that email
                    // create the user
                    let name = "",
                      group = "CommonUser",
                      email = "";
                    if (req.body.username) name = req.body.username;
                    if (req.body.group) group = req.body.group;
                    if (req.body.email) email = req.body.email;
                    var newUser = new User({
                      id: req.body.id,
                      password: createHash(req.body.password),
                      name: name,
                      // comp: req.body.comp,
                      // group: group,
                      email: email,
                    });
                    // save the user
                    newUser.save(function (err) {
                      if (err) {
                        console.log("Error in Saving user: " + err);
                        throw err;
                      }
                      console.log("User Registration succesful", newUser);
                      return done(null, newUser);
                    });
                  }
                }
              );
            };
            break;
          case "json":
            var user = JsonUser.filter(function (usr) {
              console.log(usr.email, username);
              return usr.email == username;
            });
            if (user[0]) return done(null, user[0], user[0]);
            else {
              return done(null, false, req.flash("message", "User Not found."));
            }
            break;
        }
        // Delay the execution of findOrCreateUser and execute the method
        // in the next tick of the event loop
        process.nextTick(findOrCreateUser);
      }
    )
  );

  // Generates hash using bCrypt
  var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };
};

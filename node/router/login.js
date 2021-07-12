var Model = require("../model/models.js");
var User = Model.user;
var config = require("../config/");

module.exports = (app, passport) => {
  /* GET ALL PRODUCTS */
  console.log("im in login");
  app.get("/login/id", function (req, res) {
    // render the page and pass in any flash data if it exists
    //res.render('login.html', {message: req.flash('loginMessage')});
    User.find({ id: req.params.id })
      //Table.findById(req.params.id)
      .then((result) => {
        if (!result) {
          return res.status(404).send({
            message: "data not found with id " + req.params.id,
          });
        }
        res.send(result);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "user not found with id " + req.params.id,
          });
        }
        return res.status(500).send({
          message: "Error retrieving user with id " + req.params.id,
        });
      });
  });

  app.post("/login", function (req, res, next) {
    // generate the authenticate method and pass the req/res
    passport.authenticate("login", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send(info); //res.redirect('/');
      }

      // req / res held in closure
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        jwt(user);
        //res.json(user);
      });

      async function jwt(user) {
        const jwt = require("jsonwebtoken");
        var uuid;

        switch (config.basic.passport.datasrc) {
          case "json":
            uuid = user.username;
            break;
          case "mongodb":
            uuid = user._id;
            break;
        }
        var payload = {
          // email: user.local.email,
          // password:user.local.password,
          _id: uuid,
        };

        const JWTToken = jwt.sign(payload, config.basic.passport.jwtSecret, {
          expiresIn: "6h",
        });
        console.log("username:", user);
        //return res.render("index.ejs", { user: { name: user.name } });

        //return res.render("index", { user: { name: user.name } });
        req.flash("success", user.name);
        res.redirect("/");
        // return res.status(200).json({
        //   token: JWTToken,
        //   user: user,
        // });

        // return res
        //   .render("index.ejs", { user: { name: user.name } })
        //   .status(200)
        //   .json({
        //     token: JWTToken,
        //     user: user,
        //   });
      }
    })(req, res, next);
  });
};

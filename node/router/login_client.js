var Model = require("../model/models.js");
var User = Model.User;
var config = require("../config");

module.exports = (app, passport) => {
  /* GET ALL PRODUCTS */
  console.log("im in login");
  app.get("/login", function (req, res) {
    res.render("login");
  });
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

  /**
   * @swagger
   * paths:
   *  /login_client:
   *    post:
   *      summary: oauth login from client side
   *      consumes:
   *        - application/json
   *      parameters:
   *        - in: body
   *          name: username
   *          description: id, email or name.
   *          schema:
   *            $ref: '#/definitions/login_client'
   *          responses:
   *            '200':
   *              description: Successfully logged in
   *              content:
   *                application/json:
   *                  schema:
   *                    type: object
   *                    properties:
   *                      access_token:
   *                        type: string
   *                        description: cookie for access
   *                      refresh_token:
   *                        type: string
   *                        description: when expired refresh
   *                      user:
   *                        type: object
   *                        description: logged in user profile
   */

  app.post("/login_client", function (req, res, next) {
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
          expiresIn: "5m",
        });
        const REFRESHToken = jwt.sign(
          payload,
          config.basic.passport.jwtSecret,
          {
            expiresIn: "6h",
          }
        );

        console.log("username:", user);
        //return res.render("index.ejs", { user: { name: user.name } });

        //return res.render("index", { user: { name: user.name } });
        req.flash("success", user.name);
        //res.redirect("/");
        return res.status(200).json({
          access_token: JWTToken,
          refresh_token: REFRESHToken,
          user: user,
        });

        //return res.render("index.ejs", { username: user.name });
        // .status(200)
        // .json({
        //   token: JWTToken,
        //   user: user,
        // });
      }
    })(req, res, next);
  });
};

/**
 * @swagger
 *
 * definitions:
 *   login_client:
 *    type: object
 *    required:
 *      - username
 *      - password
 *    properties:
 *      username:
 *        type: string
 *        example: ykn
 *      password:
 *        type: string
 *        example: 9080
 */

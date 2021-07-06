// ESM syntax is supported.
var express = require("express");
var passport = require("passport");
var path = require("path");
require("dotenv").config();
require("./config/dbConnect.js");
app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("static"));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/static"));
app.engine("html", require("ejs").renderFile);

app.use(passport.initialize());
var initPassport = require("./passport/init");

initPassport(passport);

require("./router/index.js")(app);

const PORT = process.env.PORT | 9001;
app.listen(PORT, () => console.log("listening on localhost:" + PORT));

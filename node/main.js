// ESM syntax is supported.
var express = require("express");
var flash = require("connect-flash");

var passport = require("passport");
var path = require("path");
var cors = require("cors");
var ejs = require("ejs");
require("dotenv").config();
require("./config/dbConnect.js");
var app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.static("static"));
app.use(express.json());
app.set("view engine", "ejs");
app.use(flash());
let ejsOptions = {
  // delimiter: '?', Adding this to tell you do NOT use this like I've seen in other docs, does not work for Express 4
  async: true,
};

// The engine is using a callback method for async rendering
app.engine("ejs", async (path, data, cb) => {
  try {
    let html = await ejs.renderFile(path, data, ejsOptions);
    cb(null, html);
  } catch (e) {
    cb(e, "");
  }
});

app.set("views", path.join(__dirname, "/static"));
//app.engine("html", require("ejs").renderFile);

app.use(passport.initialize());
var initPassport = require("./passport/init");

initPassport(app, passport);

require("./router/index.js")(app, passport);
require("./swagger/index.js")(app);

const PORT = process.env.PORT | 8006;
const HOST = process.env.HOST;
app.listen(PORT, () => console.log(`listening on ${HOST}:${PORT}`));

// ESM syntax is supported.
var express = require("express");
require("./config/dbConnect.js");
app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("static"));
app.use(express.json());
require("dotenv").config();
require("./router/index.js")(app);

const PORT = 9001;
app.listen(PORT, () => console.log("listening on localhost:" + PORT));

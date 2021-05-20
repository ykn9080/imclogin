// ESM syntax is supported.
var express = require("express");
app = express();
require("dotenv").config();
require("./router/index.js")(app);

const PORT = 9001;
app.listen(PORT, () => console.log("listening on localhost:" + PORT));

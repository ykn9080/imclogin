// ESM syntax is supported.
import express from "express";
const app = express();
require("./router/index.js")(app);
const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log("listening on localhost:" + PORT));
export {};

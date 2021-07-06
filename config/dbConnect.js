const mongoose = require("mongoose");
// mongoose.Promise = require("bluebird");
// if (process.env.NODE_ENV === "test") {
//   mongoose.connect("mongodb://localhost/APIAuthenticationTEST", {
//     useNewUrlParser: true,
//   });
// } else {
//   mongoose.connect("mongodb://localhost/APIAuthentication", {
//     useNewUrlParser: true,
//   });
// }

// Get Mongoose to use the global promise library
//mongoose.Promise = global.Promise;//deprecated after 5.0
mongoose.Promise = require("bluebird");

//Set up default mongoose connection
//var mongoDB='mongodb://yknam:ykn9080@ds135399.mlab.com:35399/imcdb';

const dbhost = "mongodb://imcmaster.iptime.org:9007";
const dbase = "local";
mongoose.connect(`${dbhost}/${dbase}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error::"));

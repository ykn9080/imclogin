var dns = require("dns");
var os = require("os");

// config.js
const basic = {
  mongodb: {
    local: "mongodb://local:27017/local",
    docean: "mongodb://167.71.208.218:8001/local",
    cyram_dev: "mongodb://src.netminer.com:9007/local",
    namubuntu: "mongodb://imcmaster.iptime.org:9007/local",
    wifiubuntu: "mongodb://imcmaster.iptime.org:9017/local",
    mlab: "mongodb://yknam:ykn9080@ds135399.mlab.com:35399/imcdb",
    azure:
      "mongodb://youngkinam:VW6yH00l5CgsyT5NurqmDEEYycgKKQLevSiS0mONgHCoNJO0Wl7BjegxUorBJpXT7I7PiYx8023FSPQpwlrAcQ%3D%3D@youngkinam.documents.azure.com:10255/?ssl=true",
  },
  mssql: {
    smarterasp: {
      user: "DB_9D66CD_imcmaster_admin",
      password: "ykn90809080",
      server: "SQL5004.Smarterasp.net",
      database: "DB_9D66CD_imcmaster",
    },
  },
  passport: {
    jwtSecret: "hellohello",
    //,datasrc:'json'//json,mongodb,mssql
    datasrc: "mongodb",
    username: "username", //id,_id,username,email
    password: "password",
  },
};
let currentsetting = {
  datasrc: basic.mongodb.wifiubuntu,
  port: 9006,
};
dns.lookup(os.hostname(), function (err, addr, family) {
  if (addr === "192.168.0.31") currentsetting.datasrc = basic.mongodb.namubuntu;
});

module.exports = { basic, currentsetting };

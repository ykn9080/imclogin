var fs = require("fs");

module.exports = (app, passport) => {
  /* GET ALL PRODUCTS */
  console.log("im in signup");

  app.post("/setsave", function (req, res, next) {
    // generate the authenticate method and pass the req/res
    console.log("req", req.params, req.body);
    myOptions = {
      name: "Avian",
      dessert: "cake",
      flavor: "chocolate",
      beverage: "coffee",
    };
    var data = JSON.stringify(myOptions);

    fs.writeFile("./data/setting.json", data, function (err) {
      if (err) {
        console.log("There has been an error saving your configuration data.");
        console.log(err.message);
        return;
      }
      console.log("Configuration saved successfully.");
      return res.render("index.ejs", { user: {} });
    });
  });

  app.post("/setload", function (req, res, next) {
    var data = fs.readFileSync(`./data/${req.body.filename}`),
      myObj;

    try {
      myObj = JSON.parse(data);
      console.dir(myObj);
      next(myObj);
    } catch (err) {
      console.log("There has been an error parsing your JSON.");
      console.log(err);
    }
  });
};

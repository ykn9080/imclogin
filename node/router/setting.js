var fs = require("fs");

module.exports = (app) => {
  app.post("/setsave", function (req, res) {
    const filename = req.body.filename;
    const keyfield = req.body.key;
    delete req.body.filename;
    delete req.body.key;

    var myOptions = req.body;
    var existdata = fs.readFileSync(`./data/${filename}.json`);
    var data = appendData(JSON.parse(existdata), myOptions, keyfield);

    data = JSON.stringify(data);
    fs.writeFile(`./data/${filename}.json`, data, function (err) {
      if (err) {
        console.log("There has been an error saving your configuration data.");
        console.log(err.message);
        return;
      }
      console.log("Configuration saved successfully.");

      res.redirect("/");
      //res.render("index.ejs", { user: {} });
    });
  });

  app.get("/setload", function (req, res, next) {
    var data = fs.readFileSync(`./data/setting.json`);
    var dt = JSON.parse(data);
    console.log(JSON.parse(data));
    res.render("setting.ejs", { ...dt });
  });
};

const appendData = (existing, newdata, keyfield) => {
  const isarray = Array.isArray(existing); //if array=>true
  if (isarray) {
    const index = existing.findIndex(
      (element) => element[keyfield] === newdata[keyfield]
    );
    if (index > -1) existing[index] = newdata;
    else existing.push(newdata);
  } else {
    existing = { ...existing, ...newdata };
  }
  return existing;
};

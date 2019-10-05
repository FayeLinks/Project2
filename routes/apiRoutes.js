var db = require("../models");

module.exports = function (app) {
    app.post("/api/bom", (req, res) => {
        console.log(req.body);
        db.Bom.create(req.body)
        .then(bom => {
            console.log(bom);
          });
    });
};



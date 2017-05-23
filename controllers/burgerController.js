var express = require("express");
var router = express.Router();

var db = require("../models");

//get the default site
router.get("/", function(req, res) {
  db.Burger.findAll({}).then(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log("Calling all orders:");
    console.log("hbsObject");
    //calling the index.handlebars and send hbsObject object
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  db.Burger.create({
    burger_name: req.body.burger_name,
    devoured: false
  }).then(function() {
    res.redirect("/");
  });
});

router.put("/:id", function(req, res) {
  console.log("hey");
  db.Burger.update({
    devoured: true
  }, {
    where: {
      id: req.params.id
    }
  }).then(function() {
    res.redirect("/");
  });
});
//   var tableInput = "burgers";
//   var objColVals = {devoured: req.body.devoured};
//   var condition = "id = " +req.params.id;
//
//   console.log("condition: ", condition);
//
// // this function has three arguments passing (obj, var, func)
//   burger.devour(tableInput, objColVals, condition, function(){
//       res.redirect("/");
//   });
// });

module.exports = router;

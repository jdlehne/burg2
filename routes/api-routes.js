// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the burgers
  app.get("/api/burgers", function(req, res) {
    db.Burgers.findAll({}).then(function(dbBurgers) {
      res.json(dbBurgers);
    //  console.log("From get in routes: " + dbBurgers);
    });
  });

  // POST route for saving a new Burger
  app.post("/api/burgers", function(req, res) {
    db.Burgers.create({
      burger_name: req.body.burger_name,
      devoured: false
    }).then(function(dbBurgers) {
      res.json(dbBurgers);
    });
  });


  // PUT route for updating burgers.
  app.put("/api/burgers/:id", function(req, res) {
    db.Burgers.update({
      burger_name: req.body.burger_name,
      devoured:true
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbBurgers) {
      res.json(dbBurgers);
    });
  });

};

const express = require("express");
const app = express();
const character = require("../models/character");

// POST method being used only to create such resource.
// Route name doesn't need to describe action, because the method already does.
app.post("/", function(req, res) {
  character.createNewCharacter(req, res);
});

module.exports = app;

const express = require("express");
const app = express();
const user = require("../models/user.js");

// POST method being used only to create such resource.
// Route name doesn't need to describe action, because the method already does.
app.post("/", function(req, res) {
  user.createNewUser(req, res);
});

app.post("/login", function(req, res) {
  user.loginUser(req, res);
});

module.exports = app;

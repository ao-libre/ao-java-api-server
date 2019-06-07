const express = require('express');
const app = express();
const user = require('../models/user.js');

app.post("/registerNewUser", function (req, res) {
    user.registerNewUser(req, res);
});

module.exports = app;

const express = require('express');
const app = express();
const character = require('../models/character');

app.post('/createNewCharacter', function(req, res) {
    character.createNewCharacter(req, res);
})

module.exports = app;

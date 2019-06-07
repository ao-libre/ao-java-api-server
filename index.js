require('dotenv').config()
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const app = express();
const port = process.env.PORT || 1337;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// app.use(cors())

// app.use('/api/v1/charfiles', require('./controllers/charfiles'));
// app.use('/api/v1/accounts', require('./controllers/accounts'));
// app.use('/api/v1/emails', require('./controllers/emails'));
// app.use('/api/v1/logs', require('./controllers/logs'));

// simple usage for a local db

app.use('/api/v1/users', require('./controllers/users'));

global.mongodb = mongojs('mydb', ['users']);
console.log(mongodb)

app.listen(port, function () {
    var datetime = new Date();
    var message = "Argentum Online JAVA API on Port:- " + port + " Started at :- " + datetime;
    console.log('\x1b[32m%s\x1b[2m', message);
});
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

app.use('/api/v1/users', require('./controllers/users'));

global.mongodb = mongojs(`mongodb://${process.env.DB_MONGODB_USER}:${process.env.DB_MONGODB_PASSWORD}@${process.env.DB_MONGODB_HOST}/${process.env.DB_MONGODB_NAME}`);

app.listen(port, function () {
    var datetime = new Date();
    var message = "Argentum Online JAVA API on Port:- " + port + " Started at :- " + datetime;
    console.log('\x1b[32m%s\x1b[0m', message);
});
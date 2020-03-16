var express = require("express");
var app = express();
var path = require('path');
require('dotenv').config()

app.use('/', routes);
app.use('/users', users);

app.post('/', function(req, res) {
});

const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})
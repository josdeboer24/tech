var express = require("express");
var app = express();
var path = require('path');
var bodyParser=require("body-parser");
var mongoose  = require('mongoose')


var mongo = require('mongodb')

require('dotenv').config()

var db = null
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT

mongo.MongoClient.connect(url, function (err, client) {
  if (err) throw err
  db = client.db(process.env.DB_NAME)
})

console.log("hoihoi");
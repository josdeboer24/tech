var express = require("express");
var app = express();
var path = require('path');
var bodyParser=require("body-parser");
var mongoose  = require('mongoose')
const uri = "mongodb+srv://josdeboer24:" + process.env.DB_PASS + "@cluster0-xtp4e.azure.mongodb.net/test?retryWrites=true&w=majority"


var mongo = require('mongodb')

require('dotenv').config()


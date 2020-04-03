var express = require("express");
var app = express();
var path = require('path');
require('dotenv').config()
const mongoose  = require('mongoose')
// var session = require("express-session")

  //-----------------------test mongo-----------------------------------
  let collection = null;
const {MongoClient} = require('mongodb');

async function main(){
    const uri = "mongodb+srv://josdeboer24:" + process.env.DB_PASS + "@cluster0-xtp4e.azure.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri);
new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    
client.connect(function (err, client) {
    if (err) {
      throw err
    }
    db = client.db(process.env.DB_NAME);
    collection = client.db("Cluster0").collection("details");
  })
  
}

//----------------einde test mongo---------------------

//parser
var bodyParser= require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app

app.listen(3000, function(){
  console.log("deze server runt op port 3000");
});

app.use('/public', express.static('public'));

app.set('view engine', 'ejs');

//routes

app.get('/', function (req, res) {
    res.render('index')
  });
  
  app.get('/index', function (req, res) {
    res.render('index')
  });

  app.get('*', function(req, res){
    res.status(404).send('pagina niet gevonden')
  });


// start app

// app.get('/allUsers', users)
// app.get('/detail/:id/' + users._id + '', users)
// app.get('/detail', users)
app.post('/', add)

function add(req, res, next){
	db.collection('/details').insertOne({
		email: req.body.email,
		password: req.body.wachtwoord,
	}, done)

	function done(err, data) {
		if (err) {
			next(err)
		} else {
			res.redirect('/home.html')
		}
	}
}


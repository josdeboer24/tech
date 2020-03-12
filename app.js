var express = require("express");
var app = express();
var path = require('path');

const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})


app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('index')
  });
  
  app.listen(3000, function(){
      console.log("poort 3000");
  });

  app.get('/about', function (req, res) {
    res.send('about')
  })

  app.get('/contact', function (req, res) {
    res.send('contact')
  })

  app.get('*', function(req, res){
    res.send('pagina niet gevonden', 404);
  });
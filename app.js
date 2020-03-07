var express = require("express");
var app = express();
var path = require('path');

app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('index')
  });
  
  app.listen(3000, function(){
      console.log("server runt op poort 3000");
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
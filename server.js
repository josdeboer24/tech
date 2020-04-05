// var express = require("express");
// var app = express();
// var path = require('path');
// require('dotenv').config()
// const mongoose  = require('mongoose')

//   //-----------------------test mongo-----------------------------------
// let collection = null;
// const {MongoClient} = require('mongodb');

// async function main(){
//     const uri = "mongodb+srv://josdeboer24:" + process.env.DB_PASS + "@cluster0-xtp4e.azure.mongodb.net/test?retryWrites=true&w=majority"
// const client = new MongoClient(uri);
// new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    
// client.connect(function (err, client) {
//     if (err) {
//       throw err
//     }
//     db = client.db(process.env.DB_NAME);
//     collection = client.db("Cluster0").collection("details");
//   })
  
// }
// let db = process.env.DB_NAME;

// //----------------einde test mongo---------------------

// //parser
// var bodyParser= require("body-parser");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// //app

// app.listen(3000, function(){
//   console.log("deze server runt op port 3000");
// });

// app.use('/public', express.static('public'));

// app.set('view engine', 'ejs');

// //routes

// app.get('/', function (req, res) {
//     res.render('index')
//   });
  
//   app.get('/index', function (req, res) {
//     res.render('index')
//   });

//   app.get('*', function(req, res){
//     res.status(404).send('pagina niet gevonden')
//   });


// // start app

// app.post('/', add)

// function add(req, res, next){
// 	db.collection('/').insertOne({
// 		email: req.body.email,
// 		password: req.body.wachtwoord,
// 	}, done)

// 	function done(err, data) {
// 		if (err) {
// 			next(err)
// 		} else {
// 			res.redirect('/home.html')
// 		}
// 	}
// }



//------------------------------------------------------------
const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const session = require('express-session');

//database configuratie
let collection = null;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@cluster0-xtp4e.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true
});

//database connect
client.connect(function (err, client) {
  if (err) {
    throw err
  }
  collection = client.db("Cluster0").collection("details");
})

//routes
app
  .use('/public', express.static('public'))
  .set('view engine', 'ejs')
  .set('views', 'views')
  .use(express.urlencoded({
    extended: false
  }))
  .use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
  }))
  .get('/index', index) 
  // .get('/finding', findMatch)
  .post('/logInData', logInData)
  // .get('/matches', matchesPage)
  // .post('/changeName', changeUserName)
  .get('*', notFound)

//informatie declaraties
// let images = [
//   "images/audi.jpg",
//   "images/porsche.png",
//   "images/mercedes.jpeg",
//   "images/bentley.jpg",
//   "images/ninjaBike.jpg",
//   "images/bike.jpg"
// ]

let data = {
  title: "Datingapp"
}

function index(req, res) {
      res.render('index.ejs')
    };

//maak een functie van
//vul data met foto's; op imageUrlX
// function fillImages() {
//   for (let i = 0; i < images.length; i++) {
//     let index = "imageUrl" + (i + 1);
//     data[index] = images[i];
//   }
// }
// fillImages();

//find match pagina
// function findMatch(req, res, next) {
//   //delete de huidige antwoorden van de ingelogde gebruiker
//   collection.deleteOne({
//     user: req.session.user
//   }, done)

//   function done(err, useData) {
//     if (err) {
//       next(err)
//     } else {
//       req.session.user = "JDB";
//       res.render('finding.ejs', {
//         data
//       })
//     }
//   }
// }

//verzenden van image op antwoorden van vraag
function logInData(req, res, next) {

  collection.insertOne({
    user: req.session.user,
    email: req.body.email,
    wachtwoord: req.body.wachtwoord
  }, done);

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.redirect('/home.html')
    }
  }
}


//pagina waarop je je matches kunt zien
// function matchesPage(req, res, next) {
//   req.session.user = "SamSloot";
//   console.log(req.session.user);
//   collection.findOne({
//     user: req.session.user
//   }, done)

//   function done(err, useData) {
//     data.user = useData;

//     if (err) {
//       next(err)
//     } else {
//       //verkrijg de url's van de user antwoorden
//       if (data.user.answerOne == 1) {
//         data.user.answerOneImg = images[0]
//       } else {
//         data.user.answerOneImg = images[1]
//       }
//       if (data.user.answerTwo == 1) {
//         data.user.answerTwoImg = images[2]
//       } else {
//         data.user.answerTwoImg = images[3]
//       }
//       if (data.user.answerThree == 1) {
//         data.user.answerThreeImg = images[4]
//       } else {
//         data.user.answerThreeImg = images[5]
//       }

//       //verzamel alle users die niet gelijk zijn aan de huidige gebruiker en stop ze in een array
//       collection.find({
//         user: {
//           $ne: req.session.user
//         }
//       }).toArray(doneTwo);

//       function doneTwo(err, useData) {
//         if (err) {
//           throw err;
//         } else {
//           //push alle gebruikers met de zelfde antwoorden als jij in een array
//           data.matches = [];
//           for (let i = 0; i < useData.length; i++) {
//             if (data.user.answerOne == useData[i].answerOne && data.user.answerTwo == useData[i].answerTwo &&
//               data.user.answerThree == useData[i].answerThree) {
//               data.matches.push(useData[i])
//               console.log(`${useData[i].user} is toegevoegd aan matches`)
//             }
//           }
//         }
//         res.render('matches.ejs', {
//           data
//         });
//       }
//     }
//   }
// }

// function changeUserName(req, res, next) {

//   //find de huidige gebruiker in de database en update zijn naam naar de nieuw ingevulde naam
//   collection.findOneAndUpdate({
//     user: req.session.user
//   }, {
//     $set: {
//       user: req.body.newName
//     }
//   }, done)

//   function done(err, useData) {
//     //verander de session van de gebruiker samen met het gerenderde data object
//     req.session.user = req.body.newName;
//     data.user.user = req.session.user;

//     if (err) {
//       next(err)
//     } else {
//       //render de pagina opnieuw om de nieuwe naam van de gebruiker te tonen
//       res.render('matches.ejs', {
//         data
//       });
//     }
//   }
// }

//404
function notFound(req, res) {
  res.status(404).end('Error: 404 : Page not found');
}

app.listen(port, () => console.log(`app running on port: ${port}`));
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
  collection = client.db("Accounts").collection("UserDetails");
  profiles = client.db("Profiles").collection("ProfileDetails");
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
  .get('/', index) 
  .get('/index', index) 
  .post('/logInData', logInData)
  .get('/register', register)
  .get('/profileCreation', profileCreation)
  .post('/makeProfile', makeProfile)
  .get('*', notFound)

let data = {
  title: "Datingapp"
}

function index(req, res) {
      res.render('index.ejs')
    };


function register(req, res) {
      res.render('register.ejs')
    };

    function profileCreation(req, res) {
      res.render('profileCreation.ejs')
    };


function logInData(req, res, next) {
  collection.insertOne({
    user: req.session.user,
    email: req.body.email,
    password: req.body.password
  }, done);

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.redirect('/profileCreation')
    }
  }
}

function makeProfile(req, res, next) {
  profiles.insertOne({
    firstName: req.session.fName,
    lastName: req.body.lName,
    gender: req.body.gender,
    age: req.body.age,
    residence: req.body.residence
  }, done);

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.redirect('/profileCreation')
    }
  }
}
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
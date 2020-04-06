const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const session = require('express-session');

//config database
let collection = null;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@cluster0-xtp4e.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true
});

//connecting databases with different branches
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
  .get('/matching', matching)
  .get('/profile', profile)
  .get('*', notFound)

let data = {
  title: "Datingapp"
}

// functions that make the app work

function index(req, res) {
      res.render('index.ejs')
    };


function register(req, res) {
      res.render('register.ejs')
    };

function profileCreation(req, res) {
      res.render('profileCreation.ejs')
    };


function matching(req, res) {
      res.render('matching.ejs')
    };


    //this function reads profile information from the database 
function profile(req, res) {
  firstName = profiles.find(firstName),
  lastName = profiles.find(lastName),
  gender = profiles.find(gender),
  age = profiles.find(age),
  residence = profiles.find(residence),
      res.render('profile.ejs')
    };    

    // this function sends the registration data to the database
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

//this function adds profile information to the database. this can be read later
function makeProfile(req, res, next) {
  profiles.insertOne({
    firstName: req.body.fName,
    lastName: req.body.lName,
    gender: req.body.gender,
    age: req.body.age,
    residence: req.body.residence
  }, done);

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.redirect('/matching')
    }
  }
}

//error 404
function notFound(req, res) {
  res.status(404).end('Oops! Error: 404 : Page not found');
}

app.listen(port, () => console.log(`app running on port: 3000`));
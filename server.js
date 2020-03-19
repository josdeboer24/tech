var express = require("express");
var app = express();
var path = require('path');
require('dotenv').config()
var bodyParser=require("body-parser");
const mongoose  = require('mongoose')

app.listen(3000, function(){
  console.log("deze server runt op poort 3000");
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

  //-----------------------test mongo-----------------------------------
  const {MongoClient} = require('mongodb');

async function main(){
    const uri = "mongodb+srv://josdeboer24:" + process.env.DB_PASS + "@cluster0-xtp4e.azure.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri);
new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    
    await client.connect();

    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

//----------------einde test mongo---------------------

// start app



app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
})); 

//formulier

app.post('/sign_up', function(req,res){ 
    var email =req.body.email; 
    var ww = req.body.wachtwoord; 
  
    var data = { 
        "email":email, 
        "wachtwoord":ww, 
    } 
db.collection('details').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("error"); 
              
          
    return res.redirect('public/home.html'); 
}) 

  
app.get('/',function(req,res){ 
res.set({ 
    'Access-control-Allow-Origin': '*'
    }); 
return res.redirect('index.html'); 
}).listen(3000);

})

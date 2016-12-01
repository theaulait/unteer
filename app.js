const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);
const port = process.env.PORT || 3000;
const api = 'http://api.indeed.com/ads/apisearch?publisher=';
const fetch = require("node-fetch");
const necessary = '&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json';
//const pub = '5690837704127357&q=';
var pub = process.env.PUB_ID;
var theQuery;
var intern = 'internship';
var location = 'new york';
var frontUrl = api + pub + "&q=";
var backUrl = '&jt=' + intern + '&l=' + location + necessary;
app.set('views', __dirname + '/views');
app.use(express.static(__dirname+'/public'));
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var db = pgp(process.env.DATABASE_URL || 'postgres://MyRiceBowl@localhost:5432/unteer');
app.listen(port, function(){
  console.log("logged in on " + port);
});

app.get('/', function(req, res){
      res.render('index');
  });

app.get("/signup", function(req, res){
  res.render('signup');
});


app.put("/signup", function(req, res){
  var data = req.body;
  db.none("INSERT INTO users VALUES($1, $2, $3)", [data.name,
    data.password, data.email]).then(function(data){
    res.render("user", {data: data})
  });
}); // end of app.put signup

app.post('/search', function(req, res){
    var keyword = req.body.q
        theQuery = frontUrl + keyword + backUrl;
    fetch(theQuery)
    .then(function(data){
      return data.json();
    })
    .then(function(data){
      var jobs = { list: [] }
        data.results.forEach(function(job){
          jobs.list.push({
            jobtitle: job.jobtitle,
            company: job.company,
            description: job.snippet,
        });
    });
      res.render('search', jobs)
    }) // end of then

 });//end of app.get search

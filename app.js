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
app.use(session({
  secret: 'getaInternship',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
//server is on
app.listen(port, function(){
  console.log("logged in on " + port);
});
//rendering login/index page
app.get('/', function(req, res){
      res.render('index');
  });
// rendering sign up/create user page
app.get('/signup', function(req, res){
  res.render('signup');
});
// rendering search
app.get('/search', function(req, res){
  res.render('search');
});

// rendering profile
app.get('/user', function(req, res){
  var user = {
   name: req.session.user.name,
   email: req.session.user.email
 }
  res.render('user', { user: user } );
});

// rendering update page
app.put('/update', function(req, res){
  db.one('SELECT * FROM users')
  res.render('update');
});


app.post('/signup', function(req, res){
  var data = req.body;
  bcrypt.hash(data.password, 10, function(err, hash){
    db.none("INSERT INTO users(name, password, email) VALUES ($1, $2, $3)", [data.name, hash, data.email])
    .catch(function(user){
      res.send("Error could not create");
    }).then(function(){
    //  res.send("Users Created!");
      res.redirect("/");
     }); //end of then
  });//end of bc
}); // end of signup pass

app.post('/login', function(req, res){
  var data = req.body;
  db.one("SELECT * FROM users WHERE email = $1", [data.email])
    .catch(function(user){
      res.send("Check email and/or password");
    })
    .then(function(user){
        bcrypt.compare(data.password, user.password, function(err, cmp){
          if(cmp){
            req.session.user = user;
            res.redirect("/user");
          }else{
            res.send("error");
          }
        });
    });
});


// Update a user
app.put('/update', function(req, res){
  var data = req.body;
});

app.delete('/session', function(req, res){

});

// performing search
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
    }); // end of then

 });//end of app.get search

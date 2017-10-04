//*****1. require express********
// Load the express module that we install using npm
var express = require("express");

// invoke var express and store the resulting application in var app
var app = express();

//******SESSION*******
// new code:
var session = require('express-session');
// original code:
var app = express();
// more new code:
app.use(session({secret: 'codingdojorocks'}));  // string for encryption


// app.get('/', function(request, response) {
//   response.send("<h1>Hello Express</h1>");
//   console.log("its working");
// })
//******Template using embebedded JavaScript******


// This sets the location where express will look for the ejs views: ejs stands for embebedded JS
app.set('views', __dirname + '/views');
//we need to install ejs
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

//**** 2. create routes ********
app.get('/', function(request, response) {
  response.render('index', {user: "Liseth"})
  console.log("its working");
});

//***PARSE DATA*****
// require body-parser
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({extended: true}));

//****POST ROUTE*****
// route to process new user form data:
app.post('/users', function (req, res){
  console.log("POST DATA ", req.body.name, req.body.email)
  console.log("POST DATA ", req.body);
  //code to add user to db goes here!
  // set the name property of session.
  req.session.name = req.body.name;
  console.log(req.session.name);
  //code to add user to db goes here!
  // redirect the user back to the root route.
  res.redirect('/')
});

//*****Data form the URl ACCESSING DATA FROM THE URL*********
app.get("/users/:id", function (req, res){
  console.log("The user id requested is:", req.params.id);
  //we have access to session here
  console.log("from users/id route", req.session.name);
  // just to illustrate that req.params is usable here:
  res.send("You requested the user with id: " + req.params.id);
  // code to get user from db goes here, etc...

});






//******3 Call the listen function
// Tell the express app to listen on port 8000
app.listen(8001, function() {
  console.log("listening on port 8001");
})


// <!--embebedded JS  -->
// <!-- <% for (var x in users) { %>
//    <h3>Name: <%= users[x].name %></h3>
//    <h4>Email: <%= users[x].email %></h4>
//    <hr>
// <% } %> -->

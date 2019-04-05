
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

//Incorporates css, imgs files etc.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  var first = req.body.first;
  var last = req.body.last;
  var email = req.body.email;

  console.log(`${first} ${last}: ${email}`);
  
});

app.listen(3000, function(){
  console.log('Server running on port 3000');
});

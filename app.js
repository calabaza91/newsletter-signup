
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

  //Data JavaScript Object to capture follower info (from MailChimp documentation)
  var data = {
    members: [
      { //One object bc subscribing one person at a time. Add more objects to add multiple people at a time
      email_address: email,
      status: "subscribed"}
    ]
  };

  //Stringify Data
  var jsonData = JSON.stringify(data);

  //Options object
  var options = {
    url: "https://us19.api.mailchimp.com/3.0/lists/5d64030d9b", //Send request to this url
    method: "POST", //How request will be processed
    headers: {
      "Authorization": "caleb1 cf532df33ff78ccee5d520ad62bbcaa1-us19"
    },
    body: jsonData //Entity body for POST requests (from npm request documentation)

  }

  request(options, function(error, response, body){
    if (error) {
      console.log(error);
    } else {
      console.log(response.statusCode);
    }
  });
});

app.listen(3000, function(){
  console.log('Server running on port 3000');
});

// API Key from mailchimp
// cf532df33ff78ccee5d520ad62bbcaa1-us19
// us19 is MailChimp server being used

// Audience ID
// 5d64030d9b

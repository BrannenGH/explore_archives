var express = require('express');
var app = express();
var fs = require('fs');
// In theory, connect to DB and load variables from JSON type
//var metadata = require('../metadata.json');
fs.readdir("../html/", function(err,files){
  files.forEach(function(file) {
    fs.readFile('../html/' + file, "utf-8")
  })
})
var head = fs.readFile("../html/head", "utf-8", function(err, data){
  if (err) throw err;
});
//var foot = fs.readFile("../html/foot", "utf-8", function(err, data){
//  if (err) throw err;
//});
var testing = true;
var html = require('path');
html.dirname('../html/');

injectMetadata(metadata, html){
  var parsed_metadata = "";
  for
  var new_html = html.replace("\uF8FF", parsed_metadata);
}

if (testing == true){
  app.set('port', process.env.PORT || 6000);
} else {
  app.set('port', process.env.PORT || 80);
}

app.get('/', function(req,res) {
  body = fs.readFile()
  res.send('<html>'+ head + "<body>" + nav + "");
});

// for var in blank, generate app listener

// Static files are all stored in the `public` dir
//app.use(express.static(path.join(__dirname, 'public')));

// If something goes wrong with the server, send a simple message
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Add 404 handling for pages that don't exist
app.use(function(req, res, next) {
  res.status(404).send("The page you requested doesn't exist.");
});

// Start the app on port 80
var server = app.listen(app.get('port'), function(  ) {
  console.log('App started and listening on port %s', server.address().port);
});

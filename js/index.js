var express = require('express');
var app = express();
var fs = require('fs');
// In theory, connect to DB and load variables from JSON type
var dbinfo = require('../dummydata/dbinfo.json');
if (testing == true || !fs.existsSync(../html/foot.html) || !fs.existsSync(../html/head.html)){
  var static_sites = require(./generate_static.js);
  generate_static.generate();
}
testing = true;

var path = require('path');

if (testing == true){
  app.set('port', process.env.PORT || 6000);
} else {
  app.set('port', process.env.PORT || 80);
}

// - Create a default title
app.title = dbinfo.title;
console.log("Server is running with title %s", dbinfo.title);

// Static files are all stored in the `public` dir
app.use(express.static(path.join(__dirname, 'public')));

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

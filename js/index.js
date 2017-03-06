var express = require('express');
var app = express();
// In theory, connect to DB and load variables from JSON type
var dbinfo = require('../dummydata/dbinfo.json')
testing = true;

var path = require('path');

if (testing == true){
  app.set('port', process.env.PORT || 6000);
} else {
  app.set('port', process.env.PORT || 80);
}

// - Create a default title
app.title = dbinfo.title;

// The default route loads the home page.
app.get('/', function( req, res ) {
  res.render('index', { title: app.title});
});

// To keep things simple, sub-pages are required to be letters only.
app.get('/(([a-z]+))/', function( req, res) {
  // get information form mongoDB and load into pages
  res.render(page, templateVars, function (err, html) {
    if (err) {
      //   - If the template doesn't exist, send a 404
      res.redirect('/404/');
    } else {
      //   - Otherwise, render the template as expected
      res.end(html);
    }
  });
});

// For blog posts, we use the slug to identify the post.
// However, to keep this app front-end only, we're using hard-coded content.
app.get('/blog/:slug/', function( req, res ) {

  var slug = req.params.slug,
      post = {};

  // - Loop through the blog posts to find the one matching the slug
  app.blogs.some(function( blog ) {
    var permalink = '/blog/' + slug + '/';
    if (blog.permalink===permalink) {
      post = blog;
    }
  });

  res.render('single', post, function( err, html) {
    if (err) {
      res.redirect('/404/');
    } else {
      res.end(html);
    }
  });

});

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

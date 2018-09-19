const express = require('express');
const hbs = require('express-handlebars');

// const cf = require('cross-fetch');

// import { fetch } from 'cross-fetch';
require('cross-fetch/polyfill');

const app = express();
const host = '127.0.0.1';
const port = 3000;

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/css', express.static('public/css'));

const API_KEY = '43a19a70-b76e-11e8-bf0e-e9322ccde4db';

app.get('/', (req, res) => {
  const url = `https://api.harvardartmuseums.org/gallery?size=50&apikey=${API_KEY}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    res.render('home', {title: "Gallery Listing", galleries: data.records});
  });
});

app.get('/gallery/:gallery_id', function(req, res) {
  const url = `https://api.harvardartmuseums.org/object?size=50&gallery=${req.params.gallery_id}&apikey=${API_KEY}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    res.render('objects', {title: "Object Listing", gallery: req.params.gallery_id, objects: data.records});
  });
});

app.get('/object/:object_id', function(req, res) {
  const url = `https://api.harvardartmuseums.org/object/${req.params.object_id}?apikey=${API_KEY}`;
  fetch(url)
  .then(response => response.json())
  .then(object => {
    res.render('object', {title: "Artifact Information", object: object});
  });
});

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}/`);
});

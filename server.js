const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const path = require('path');
require('cross-fetch/polyfill');

const app = express();
const host = '127.0.0.1';
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const API_KEY = '43a19a70-b76e-11e8-bf0e-e9322ccde4db';

app.get('/', (req, res) => {
  const url = `https://api.harvardartmuseums.org/gallery?size=100&apikey=${API_KEY}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    res.render('index', {galleries: data.records});
  });
});

app.get('/gallery/:gallery_id', function(req, res) {
  const url = `https://api.harvardartmuseums.org/object?size=50&gallery=${req.params.gallery_id}&apikey=${API_KEY}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    res.render('objects', {gallery: req.params.gallery_id, objects: data.records});
  });
});

app.get('/object/:object_id', function(req, res) {
  const url = `https://api.harvardartmuseums.org/object/${req.params.object_id}?apikey=${API_KEY}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    res.render('object', {object: data});
  });
});

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}/`);
});
